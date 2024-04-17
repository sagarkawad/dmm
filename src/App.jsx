import { useState, useRef, useEffect } from "react";
import Input from "./components/Input";
import Result from "./components/Result";

import { signInWithGoogle } from "./firebase.js";

import GoogleIcon from "@mui/icons-material/Google";
import signin from "./assets/signin.svg";

const App = () => {
  const [data, setData] = useState([]);
  const [exist, setExist] = useState(false);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);

  let name = useRef();

  //clear input
  function clearInput() {
    name.current.value = "";
  }

  function setUserData() {
    if (!localStorage.getItem("name")) {
      return;
    }
    setUser({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      profilePic: localStorage.getItem("profilePic"),
      uid: localStorage.getItem("uid"),
    });
  }

  useEffect(() => {
    setUserData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://digital-mess-manager-default-rtdb.firebaseio.com/${user.uid}.json`
      );
      const dbData = await response.json();
      console.log(dbData);

      if (!dbData) {
        setData([]);
        return;
      }

      const simplifiedData = Object.keys(dbData).map((key) => {
        const {
          sName: name,
          joinD: joinDate,
          endD: endDate,
          daysC: daysCompleted,
          daysR: daysRemaining,
        } = dbData[key];
        return { name, joinDate, endDate, daysCompleted, daysRemaining };
      });

      // Update state with fetched data
      console.log("simplified data - ", simplifiedData);

      setData([...simplifiedData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data from Firebase Realtime Database
    fetchData();

    // Cleanup function to remove any unnecessary subscriptions or resources
  }, [user]); // Empty dependency array ensures useEffect runs only once on component mount

  async function handleSignInWithGoogle() {
    await signInWithGoogle();
    // console.log(result);
    setUserData();
  }

  console.log(data);
  console.log("stateUser", user);

  const setDataHandler = async function (sName, joinD, endD, daysC, daysR) {
    const res = await fetch(
      `https://digital-mess-manager-default-rtdb.firebaseio.com/${user.uid}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sName,
          joinD,
          endD,
          daysC,
          daysR,
        }),
      }
    );

    if (res) {
      alert("Data Stored");
      fetchData();
      clearInput();
    } else {
      alert("pls fill the data");
    }
  };

  function onChangeHandler() {
    setInput(name.current.value);
    setExist(false);
    data.map((el) => {
      if (el.name == name.current.value) {
        setExist(true);
        return;
      }
    });
  }

  // Function to calculate the number of days between two dates
  function calculateDaysPassed(startDate, endDate) {
    // Convert both dates to milliseconds
    const startMilliseconds = startDate.getTime();
    const endMilliseconds = endDate.getTime();

    // Calculate the difference in milliseconds
    const differenceMilliseconds = endMilliseconds - startMilliseconds;

    // Convert the difference to days
    const daysPassed = Math.ceil(
      differenceMilliseconds / (1000 * 60 * 60 * 24)
    );

    return daysPassed;
  }

  async function onDeleteHandler(name) {
    console.log("on delete handler triggered!");

    try {
      // Fetch all data from the database
      const response = await fetch(
        `https://digital-mess-manager-default-rtdb.firebaseio.com/${user.uid}.json`
      );
      const allData = await response.json();

      // Find the ID associated with the record that matches the name
      let idToDelete;
      Object.keys(allData).forEach((key) => {
        if (allData[key].sName === name) {
          idToDelete = key;
        }
      });

      // If ID is found, perform the delete operation
      if (idToDelete) {
        const deleteResponse = await fetch(
          `https://digital-mess-manager-default-rtdb.firebaseio.com/${user.uid}/${idToDelete}.json`,
          {
            method: "DELETE",
          }
        );
        alert("Data deleted");
        fetchData();
        clearInput();
        setExist(false);
      } else {
        console.log("No record found with the specified name");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  async function onUpdateHandler(name, newData) {
    try {
      // Fetch all data from the database
      const response = await fetch(
        `https://digital-mess-manager-default-rtdb.firebaseio.com/${user.uid}.json`
      );
      const allData = await response.json();

      // Find the ID associated with the record that matches the name
      let idToUpdate;
      Object.keys(allData).forEach((key) => {
        if (allData[key].sName === name) {
          idToUpdate = key;
        }
      });

      // If ID is found, perform the update operation
      if (idToUpdate) {
        const updateResponse = await fetch(
          `https://digital-mess-manager-default-rtdb.firebaseio.com/${user.uid}/${idToUpdate}.json`,
          {
            method: "PATCH", // or PUT
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }
        );
        const responseData = await updateResponse.json();
        console.log("Data updated:", responseData);
        alert("Data updated!");
        fetchData();
        setExist(false);
      } else {
        console.log("No record found with the specified name");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  console.log(data);
  console.log(exist);

  return (
    <div>
      {user ? (
        <>
          <nav className="flex justify-between mb-6">
            <h1 className="text-slate-600 text-3xl mt-1">DMM</h1>
            <img
              src={user.profilePic}
              alt={user.displayName}
              className="rounded-full h-12"
            />
          </nav>
          <div>
            <Input
              exist={exist}
              setDataHandler={setDataHandler}
              onChangeHandler={onChangeHandler}
              onDeleteHandler={onDeleteHandler}
              updateDataByName={onUpdateHandler}
              ref={name}
            />
            <Result
              data={data}
              name={input}
              onDeleteHandler={onDeleteHandler}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <h1 className="font-bold text-slate-600 mb-4">Welcome</h1>

          <h2 className="text-2xl font-bold text-slate-500 mb-2">
            Sign in to Continue!
          </h2>
          <img src={signin} alt="" className="mt-10 h-80  mb-10" />
          <button className="text-white h-16 font-bold text-l mb-6">
            Sign Up
          </button>
          <button
            onClick={handleSignInWithGoogle}
            className="text-white h-16 font-bold text-l mb-10"
          >
            Sign In with <GoogleIcon className="mb-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

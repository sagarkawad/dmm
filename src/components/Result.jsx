import MyCalendar from "./MyCalendar";

const Result = function ({ data, name }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0, so we add 1
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const dateString = formattedDate; // Your date string
  return (
    <section className="mt-10">
      {data.map((el) => {
        if (el.name == name) {
          return (
            <div key={name}>
              <h2 className="text-xl font-bold text-slate-600">
                Customer Details
              </h2>
              <div
                key={name}
                className="flex flex-col items-center text-2xl bg-purple-500 p-8  rounded-xl text-white"
              >
                <MyCalendar />
                <p>Name - {el.name}</p>
                <p>Joining - {el.joinDate}</p>
                <p>Ending - {el.endDate}</p>
                <p>Today - {formattedDate}</p>
                <p>Days Completed - {el.daysCompleted}</p>
                <p>Days Remaining - {el.daysRemaining}</p>
              </div>
            </div>
          );
        }
      })}
    </section>
  );
};

export default Result;

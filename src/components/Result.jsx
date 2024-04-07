import MyCalendar from "./MyCalendar";

const Result = function ({ data, name }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0, so we add 1
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const dateString = formattedDate; // Your date string
  return (
    <section className="mt-4">
      <h2>Result</h2>
      {data.map((el) => {
        if (el.name == name) {
          return (
            <div key={name}>
              <p>name: {el.name}</p>
              <p>joining date: {el.joinDate}</p>
              <p>end date: {el.endDate}</p>
              <p>today's date: {formattedDate}</p>
              <p>days completed: {el.daysCompleted}</p>
              <p>days remaining: {el.daysRemaining}</p>
              {/* <MyCalendar /> */}
            </div>
          );
        }
      })}
    </section>
  );
};

export default Result;

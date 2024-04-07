import { forwardRef, useEffect, useRef } from "react";

const Input = forwardRef(function Input(
  { exist, setDataHandler, onChangeHandler, onDeleteHandler, updateDataByName },
  ref
) {
  let joinDate = useRef();
  let endDate = useRef();
  let newName = useRef();

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

  return (
    <section className="credentials-section flex flex-col">
      <label htmlFor="name">User details</label>
      <input
        type="text"
        className="name mb-3 p-3"
        onChange={onChangeHandler}
        ref={ref}
      />
      {exist ? (
        <input
          type="text"
          className="name mb-3 p-3"
          placeholder="Enter new name"
          ref={newName}
        />
      ) : undefined}
      <label htmlFor="joinDate">Join Date</label>
      <input type="date" className="joinDate mb-3 p-3" ref={joinDate} />
      <label htmlFor="endDate">End Date</label>
      <input type="date" className="endDate mb-3 p-3" ref={endDate} />
      <div>
        {!exist ? (
          <button
            onClick={() => {
              setDataHandler(
                ref.current.value,
                joinDate.current.value,
                endDate.current.value,
                calculateDaysPassed(
                  new Date(joinDate.current.value),
                  new Date()
                ),
                calculateDaysPassed(new Date(), new Date(endDate.current.value))
              );
            }}
          >
            Add
          </button>
        ) : (
          <div className="flex justify-between">
            <button
              onClick={() =>
                updateDataByName(ref.current.value, {
                  sName: newName.current.value,
                  joinD: joinDate.current.value,
                  endD: endDate.current.value,
                  daysC: calculateDaysPassed(
                    new Date(joinDate.current.value),
                    new Date()
                  ),
                  daysR: calculateDaysPassed(
                    new Date(),
                    new Date(endDate.current.value)
                  ),
                })
              }
            >
              Edit
            </button>
            <button onClick={() => onDeleteHandler(ref.current.value)}>
              Delete
            </button>
          </div>
        )}
      </div>
      {/* <p className={`text-amber-900 ${exist ? "" : "invisible"}`}>
        user already exists.
      </p> */}
    </section>
  );
});

export default Input;

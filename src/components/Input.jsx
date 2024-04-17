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
      <label htmlFor="name" className="text-xl font-bold text-slate-600">
        Customer
      </label>
      <input
        type="text"
        className="name p-3 bg-indigo-100 mb-6"
        onChange={onChangeHandler}
        ref={ref}
      />
      {exist ? (
        <input
          type="text"
          className="name mb-3 p-3 bg-indigo-100"
          placeholder="Enter new name"
          ref={newName}
        />
      ) : undefined}
      <label htmlFor="joinDate" className="text-xl font-bold text-slate-600">
        Joining
      </label>
      <input
        type="date"
        className="joinDate mb-6 p-3 bg-indigo-100"
        ref={joinDate}
      />
      <label htmlFor="endDate" className="text-xl font-bold text-slate-600">
        Completion
      </label>
      <input
        type="date"
        className="endDate mb-6 p-3 bg-indigo-100"
        ref={endDate}
      />
      <div>
        {!exist ? (
          <button
            className="w-32 h-12 text-white"
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
              className="w-32 h-12 text-white"
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
            <button
              className="w-32 h-12 text-white"
              onClick={() => onDeleteHandler(ref.current.value)}
            >
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

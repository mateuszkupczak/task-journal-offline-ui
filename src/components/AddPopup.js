import { useState } from "react";
import Button from "./Button";
import ButtonsBar from "./ButtonsBar";

export default function AddPopup({ weekdays, months, onCloseClick, setData }) {
  const now = new Date();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [weekday, setWeekday] = useState(new Date().getDay());

  const [isDate, setIsDate] = useState(false);

  const [day, setDay] = useState(now.getDate());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getYear() + 1900);
  const [isMonthEnabled, setIsMonthEnabled] = useState(false);
  const [isYearEnabled, setIsYearEnabled] = useState(false);

  const [highlightName, setHighlightName] = useState(false);

  function updateDay(day, forceUpdate = false) {
    let newDay = day;

    if (newDay < 1) newDay = 1;
    else if (newDay > 31) newDay = 31;

    if (isMonthEnabled) {
      switch (month) {
        case 4:
        case 6:
        case 9:
        case 11:
          if (newDay > 30) newDay = 30;
          break;
        case 2:
          if (newDay > 29) newDay = 29;
          break;
        default:
          if (newDay > 31) newDay = 31;
          break;
      }
    }

    if (isMonthEnabled && isYearEnabled && year % 4 !== 0 && newDay > 28)
      newDay = 28;

    if (forceUpdate || newDay !== day) setDay((day) => (day = newDay));
  }

  function handleDayChange(e) {
    updateDay(Number(e.target.value), true);
  }

  function handleYearChange(e) {
    let newYear = Number(e.target.value);

    if (newYear < 1970) newYear = 1970;
    else if (newYear > 9999) newYear = 9999;

    setYear(newYear);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      setHighlightName(true);
      return;
    } else {
      setHighlightName(false);
    }

    setData((data) => [
      ...data,
      {
        id: data.length !== 0 ? data[data.length - 1].id + 1 : 1,
        name: name,
        description: description,
        weekday: !isDate ? weekday : null,
        day: isDate ? day : null,
        month: isDate && isMonthEnabled ? month : null,
        year: isDate && isMonthEnabled && isYearEnabled ? year : null,
      },
    ]);

    onCloseClick();
  }

  updateDay(day);

  return (
    <div className="popup">
      <ButtonsBar>
        <Button onClick={onCloseClick}>Close</Button>
      </ButtonsBar>
      <div className="contents">
        <h2>Add new task</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className={highlightName ? "mandatory" : ""}>
            <span className="label">
              <label>Name:</label>
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </p>
          <p>
            <span className="label">
              <label>Description:</label>
            </span>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </p>
          <p>
            <span>
              <input
                type="checkbox"
                value={isDate}
                onChange={(e) => setIsDate(e.target.checked)}
              />
              Use date
            </span>
          </p>
          {isDate ? (
            <>
              <p>
                <span className="label">
                  <label>Day:</label>
                </span>
                <span className="day-input">
                  <input
                    type="number"
                    value={day}
                    onChange={(e) => handleDayChange(e)}
                  />
                </span>
              </p>
              <p>
                <span className="label">
                  <label>Month:</label>
                </span>
                <span>
                  <select
                    value={month}
                    disabled={!isMonthEnabled}
                    onChange={(e) => setMonth(Number(e.target.value))}
                  >
                    {months.map((month, i) => (
                      <option key={`month-${i + 1}`} value={i + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <input
                    type="checkbox"
                    value={isMonthEnabled}
                    onChange={(e) => setIsMonthEnabled(e.target.checked)}
                  />
                </span>
              </p>
              <p>
                <span className="label">
                  <label>Year:</label>
                </span>
                <span className="year-input">
                  <input
                    type="number"
                    value={year}
                    disabled={!isMonthEnabled || !isYearEnabled}
                    onChange={(e) => handleYearChange(e)}
                  />
                  <input
                    type="checkbox"
                    value={isYearEnabled}
                    disabled={!isMonthEnabled}
                    onChange={(e) => setIsYearEnabled(e.target.checked)}
                  />
                </span>
              </p>
            </>
          ) : (
            <p>
              <span className="label">
                <label>Weekday:</label>
              </span>
              <select
                value={weekday}
                onChange={(e) => setWeekday(Number(e.target.value))}
              >
                {weekdays.map((weekday, i) => (
                  <option key={`weekday-${i + 1}`} value={i + 1}>
                    {weekday}
                  </option>
                ))}
              </select>
            </p>
          )}
          <p>
            <Button>Add</Button>
          </p>
        </form>
      </div>
    </div>
  );
}

import Button from "./Button";
import ButtonsBar from "./ButtonsBar";

export default function DetailsPopup({
  weekdays,
  months,
  task,
  isTaskRelevant,
  onCloseClick,
  onDeleteClick,
}) {
  return (
    <div className={`popup ${isTaskRelevant(task) ? "popup-relevant" : ""}`}>
      <ButtonsBar>
        <Button onClick={onCloseClick}>Close</Button>
        <Button onClick={onDeleteClick}>Delete</Button>
      </ButtonsBar>
      <div className="contents">
        <h2>Task details</h2>
        <p>
          <span>
            <label className="label">Name:</label>
          </span>
          {task.name}
        </p>
        {task.description && (
          <p>
            <span className="label">
              <label>Description:</label>
            </span>
            {task.description}
          </p>
        )}
        {task.weekday && (
          <p>
            <span className="label">
              <label>Weekday:</label>
            </span>
            {weekdays[task.weekday - 1]}
          </p>
        )}
        {task.day && (
          <p>
            <span className="label">
              <label>Date:</label>
            </span>
            {task.day}
            {Number.isInteger(task.month) && <> {months[task.month - 1]}</>}
            {Number.isInteger(task.year) && <> {task.year}</>}
          </p>
        )}
      </div>
    </div>
  );
}

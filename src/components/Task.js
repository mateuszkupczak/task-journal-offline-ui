export default function Task({
  task,
  weekdays,
  months,
  isTaskRelevant,
  onTaskClick,
}) {
  return (
    <div
      className={`contents task ${isTaskRelevant(task) ? "task-relevant" : ""}`}
      onClick={onTaskClick}
    >
      <p>
        <strong>{task.name}</strong>
      </p>
      {Number.isInteger(task.weekday) && <p>{weekdays[task.weekday - 1]}</p>}
      {Number.isInteger(task.day) && (
        <p>
          {task.day}
          {Number.isInteger(task.month) && <> {months[task.month - 1]}</>}
          {Number.isInteger(task.year) && <> {task.year}</>}
        </p>
      )}
    </div>
  );
}

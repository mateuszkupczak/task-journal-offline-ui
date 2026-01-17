import Task from "./Task";

export default function TaskList({
  data,
  weekdays,
  months,
  isTaskRelevant,
  setOpenTaskId,
}) {
  return (
    <div className="task-list">
      {data.map((task) => (
        <Task
          key={`task-${task.id}`}
          task={task}
          weekdays={weekdays}
          months={months}
          isTaskRelevant={isTaskRelevant}
          setOpenTaskId={setOpenTaskId}
        />
      ))}
    </div>
  );
}

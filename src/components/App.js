import { useState } from "react";
import AddPopup from "./AddPopup";
import Button from "./Button";
import ButtonsBar from "./ButtonsBar";
import DetailsPopup from "./DetailsPopup";
import NotificationPopup from "./NotificationPopup";
import Task from "./Task";
import TaskList from "./TaskList";
import { useJsonLocalStorage } from "../hooks/useJsonLocalStorage";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function App() {
  const [data, setData] = useJsonLocalStorage("data", []);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(
    checkIfRelevantTasks(),
  );
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [openTaskId, setOpenTaskId] = useState(null);

  function getTasksToDo() {
    const now = new Date();

    return data.filter(
      (task) =>
        (task.weekday && now.getDay() === task.weekday) ||
        (task.day &&
          task.month &&
          task.year &&
          now.getDate() === task.day &&
          now.getMonth() + 1 === task.month &&
          now.getYear() + 1900 === task.year) ||
        (task.day &&
          task.month &&
          !task.year &&
          now.getDate() === task.day &&
          now.getMonth() + 1 === task.month) ||
        (task.day && !task.month && !task.year && now.getDate() === task.day),
    );
  }

  function checkIfRelevantTasks() {
    const tasksToDo = getTasksToDo();

    return tasksToDo.length > 0;
  }

  function isTaskRelevant(task) {
    const tasksToDo = getTasksToDo();

    return tasksToDo.filter((taskToDo) => taskToDo.id === task.id).length > 0;
  }

  function handleDelete(id) {
    setData((data) => data.filter((task) => task.id !== id));
    setOpenTaskId(null);
  }

  return (
    <div className="app">
      {isNotificationPopupOpen && (
        <NotificationPopup
          getTasksToDo={() => getTasksToDo()}
          onCloseClick={() => setIsNotificationPopupOpen(false)}
        />
      )}
      <ButtonsBar>
        <Button onClick={() => setIsAddPopupOpen(true)}>Add</Button>
      </ButtonsBar>
      <TaskList>
        {data.map((task) => (
          <Task
            key={`task-${task.id}`}
            task={task}
            weekdays={weekdays}
            months={months}
            isTaskRelevant={isTaskRelevant}
            onClick={() => setOpenTaskId(task.id)}
          />
        ))}
      </TaskList>
      {isAddPopupOpen && (
        <AddPopup
          weekdays={weekdays}
          months={months}
          onCloseClick={() => setIsAddPopupOpen(false)}
          setData={setData}
        />
      )}
      {openTaskId != null && (
        <DetailsPopup
          weekdays={weekdays}
          months={months}
          task={data.filter((task) => task.id === openTaskId)[0]}
          isTaskRelevant={isTaskRelevant}
          onCloseClick={() => setOpenTaskId(null)}
          onDeleteClick={() =>
            handleDelete(
              data.filter((dataObj) => dataObj.id === openTaskId)[0].id,
            )
          }
        />
      )}
    </div>
  );
}

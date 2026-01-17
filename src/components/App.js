import { useState } from "react";
import AddPopup from "./AddPopup";
import Button from "./Button";
import ButtonsBar from "./ButtonsBar";
import TaskList from "./TaskList";
import DetailsPopup from "./DetailsPopup";
import NotificationPopup from "./NotificationPopup";

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

const initialData = [
  {
    id: 1,
    name: "Water garden",
    weekday: 2, // Tuesday
    description: "Every plant around the house",
  },
  {
    id: 2,
    name: "Pay monthly VAT tax",
    day: 25,
    description: "Consult with your tax advisor",
  },
  {
    id: 3,
    name: "Celebrate your birthday",
    day: 15,
    month: 4,
    description: "HAPPY BIRTHDAY!!!",
  },
  {
    id: 4,
    name: "Arrive in Gdańsk",
    day: 13,
    month: 2,
    year: 2026,
    description: "Remcon 2026 is happening!",
  },
];

export default function App() {
  const [data, setData] = useState([...initialData]);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(
    checkIfRelevantTasks()
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
        (task.day && !task.month && !task.year && now.getDate() === task.day)
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
      <TaskList
        data={data}
        weekdays={weekdays}
        months={months}
        isTaskRelevant={isTaskRelevant}
        setOpenTaskId={setOpenTaskId}
      />
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
              data.filter((dataObj) => dataObj.id === openTaskId)[0].id
            )
          }
        />
      )}
    </div>
  );
}

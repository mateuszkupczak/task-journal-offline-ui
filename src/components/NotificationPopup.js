import Button from "./Button";
import ButtonsBar from "./ButtonsBar";

export default function NotificationPopup({ getTasksToDo, onCloseClick }) {
  const tasksToDo = getTasksToDo();

  return (
    <div className="popup popup-relevant">
      <ButtonsBar>
        <Button onClick={onCloseClick}>Close</Button>
      </ButtonsBar>
      <div className="contents">
        <h2>You have tasks to do!</h2>
        <p>
          You are supposed to perform the following tasks <strong>today</strong>
          :
        </p>
        <ul>
          {tasksToDo.map((task, i) => (
            <li key={`task-to-do-${i + 1}`}>{task.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

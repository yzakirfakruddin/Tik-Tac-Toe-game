import { useState } from "react";

export default function Player({ intitalName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(intitalName);

  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // setIsEditing(isEditing ? false : true);
    // setIsEditing(!isEditing);
    // the above two methods are avoided because the don't update instantly so we use arrow function
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editableplayerName = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";

  if (isEditing) {
    editableplayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editableplayerName}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleEditClick}>{btnCaption}</button>
      </span>
    </li>
  );
}

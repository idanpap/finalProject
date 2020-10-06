import React, { useState } from "react";

const CreateRoom = (props) => {
  const [roomNumber, setRoomNumber] = useState();

  console.log("this is the state", roomNumber);

  function create() {
    const id = roomNumber;
    console.log(id);
    props.history.push(`/room/${id}`);
    // props.history.push(`/room/${id}`);
  }

  function onEnteringChar(event) {
    setRoomNumber(event.target.value);
  }

  return (
    <div className="button">
      <label htmlFor="roomNumber">Please enter a room number</label>
      <input
        type="number"
        name="roomNumber"
        id="roomNumber"
        value={roomNumber}
        onChange={onEnteringChar}
      ></input>

      {roomNumber ? (
        <button onClick={create} id="goRoom">
          Enter Room
        </button>
      ) : (
        <h1> Add a room number </h1>
      )}
    </div>
  );
};
export default CreateRoom;

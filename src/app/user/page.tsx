"use client";

import { useState } from "react";

const UserName = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // To track whose turn it is
  const [winner, setWinner] = useState(null); // To track the winner

  // Function to handle click on a cell
  const handleClick = (index: any) => {
    // If the cell is already filled or there's a winner, return early
    if (board[index] || winner) return;

    // Create a copy of the board array
    const newBoard = [...board];

    // Assign X or O based on whose turn it is
    newBoard[index] = xIsNext ? "X" : "O";

    // Update the board state
    setBoard(newBoard);

    // Check for winner
    const newWinner = calculateWinner(newBoard);
    setWinner(newWinner);

    // Toggle xIsNext for the next turn
    setXIsNext(!xIsNext);
  };

  // Function to calculate the winner
  const calculateWinner = (board: any) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    // If no winner
    return null;
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <>
      <div className="container">
        {/* <div classNameName="text">
          <h1>Enter Your Name To Start</h1>
        </div>
        <form>
          <div classNameName="form-row">
            <div classNameName="input-data">
              <input type="text" required />
              <div classNameName="underline"></div>
              <label htmlFor="">Enter Your Name</label>
            </div>
          </div>
        </form> */}

        <div className="userList">
          <h2>Players</h2>
          <div
            className="container flex justify-center p-6 w-[50%] text-[#000] rounded-lg"
            style={{
              margin: "0 auto",
              borderRadius: "8px;",
              background: "lightblue",
            }}
          >
            <div className="d-flex flex-col">
              <h4>Anshu</h4>
              <h4>Anshu</h4>
              <h4>Anshu</h4>
              <h4>Anshu</h4>
            </div>
          </div>
        </div>

        <div className="UserPair">
          <h2>Players</h2>
          <div
            className="container flex justify-center p-6 w-[50%] text-[#000] rounded-lg"
            style={{
              margin: "0 auto",
              borderRadius: "8px;",
              background: "lightblue",
            }}
          >
            <div className="d-flex justify-between items-center">
              <h4 className="px-10 py-5">Anshu</h4>
              <h4 className="px-10 py-5">Ayush</h4>
            </div>
            <div className="d-flex justify-between items-center">
              <h4 className="px-10 py-5">Deepraj</h4>
              <h4 className="px-10 py-5">Nawroz</h4>
            </div>
          </div>
        </div>

        {/* <div className="tic-tac">
          <div
            className="bg-white shadow-md rounded-md p-4 w-[50%]"
            style={{ margin: "25px auto" }}
          >
            <h1 className="text-3xl font-bold mb-4 text-center">Tic Tac Toe</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="cell border border-gray-200 h-24 flex justify-center items-center text-5xl font-bold cursor-pointer">
                X
              </div>
              <div className="cell border border-gray-200 h-24 flex justify-center items-center text-5xl font-bold cursor-pointer">
                O
              </div>
              <div className="cell border border-gray-200 h-24 flex justify-center items-center text-5xl font-bold cursor-pointer">
                X
              </div>
              <div className="cell border border-gray-200 h-24 flex justify-center items-center text-5xl font-bold cursor-pointer">
                O
              </div>
              <div className="cell border border-gray-200 h-24 flex justify-center items-center text-5xl font-bold cursor-pointer">
                X
              </div>
              <div className="cell border border-gray-200 h-24 flex justify-center items-center text-5xl font-bold cursor-pointer">
                O
              </div>
              <div className="cell border border-gray-200 h-24 flex justify-center items-center text-5xl font-bold cursor-pointer">
                X
              </div>
              <div className="cell border border-gray-200 h-24 flex justify-center items-center text-5xl font-bold cursor-pointer">
                O
              </div>
              <div className="cell border border-gray-200 h-24 flex justify-center items-center text-5xl font-bold cursor-pointer">
                X
              </div>
            </div>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-semibold d-flex m-auto">
              Reset Game
            </button>
          </div>
        </div> */}

        <div className="container mx-auto mt-10">
          {winner ? (
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-6">Winner: {winner}</h1>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold"
                onClick={resetGame}
              >
                Reset Game
              </button>
            </div>
          ) : (
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
              <p className="text-lg">
                {xIsNext ? "Next Player: X" : "Next Player: O"}
              </p>
            </div>
          )}
          {winner === null && (
            <div className="grid grid-cols-3 gap-4 w-72 mx-auto">
              {board.map((cell, index) => (
                <div
                  key={index}
                  className="cell border border-gray-300 h-24 flex justify-center items-center text-5xl font-bold cursor-pointer hover:bg-gray-100"
                  onClick={() => handleClick(index)}
                >
                  {cell}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default UserName;

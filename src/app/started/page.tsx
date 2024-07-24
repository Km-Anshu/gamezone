"use client";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../api/methods";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [user, setUser] = useState<any>(null);

  // Function to fetch user data
  const fetchData = async () => {
    try {
      const response = (await fetchUserData(
        `users:${window.localStorage.getItem("userId")}`
      )) as any;
      if (response?.Response?.message === "success") {
        setUser(response.data); // Assuming your API response has a 'data' field containing user info
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch user data on component mount
  }, []);

  // Function to handle click on a cell
  const handleClick = (index: any) => {
    if (board[index] || winner) return; // Ignore click if cell is already filled or there's a winner

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O"; // Assign 'X' or 'O' based on current player's turn
    setBoard(newBoard);

    // Check for winner after each move
    const newWinner = calculateWinner(newBoard);
    setWinner(newWinner);

    // If there's a winner, update router query parameters to show game result
    if (newWinner) {
      router.push(
        `/game-started?room-id=${
          user.gameId
        }&user-id=${window.localStorage.getItem("userId")}`
      );
    }

    setXIsNext(!xIsNext); // Toggle player turn
  };

  // Function to calculate the winner
  const calculateWinner = (board: any) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return 'X' or 'O' if there's a winner
      }
    }

    return null; // Return null if no winner
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Reset board
    setWinner(null); // Clear winner
    setXIsNext(true); // Set X to start the next game
  };

  return (
    <div className="container mx-auto mt-10">
      {winner ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">
            Winner: {winner === "X" ? user?.name : user?.opponentName}
          </h1>
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
            {xIsNext
              ? `Next Player: ${user?.name}`
              : `Next Player: ${user?.opponentName}`}
          </p>
        </div>
      )}
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
    </div>
  );
};

export default Page;

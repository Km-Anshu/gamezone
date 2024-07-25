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

  const fetchData = async () => {
    try {
      const response = (await fetchUserData(
        `users:${window.localStorage.getItem("userId")}`
      )) as any;
      if (response?.Response?.message === "success") {
        setUser(response.data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (index: any) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    setWinner(newWinner);

    if (newWinner) {
      router.push(
        `/game-started?room-id=${
          user.gameId
        }&user-id=${window.localStorage.getItem("userId")}`
      );
    }

    setXIsNext(!xIsNext);
  };

  // winner
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
        return board[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
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
          <h1 className="text-3xl font-bold">Let's Play</h1>
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

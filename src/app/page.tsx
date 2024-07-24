"use client";

import { postUserInfo } from "@/api/methods";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<any>("");
  const router = useRouter();
  const SubmitInputInfo = () => {
    window.localStorage.setItem("userInfo", name);
    const response = postUserInfo("register", { name: name }) as any;
    setUsers(response);
    // {
    //     "status": 200,
    //     "message": "success",
    //     "data": {
    //         "userId": "user123",
    //         "gameId": "gameId"
    //     }
    // }

    if (response.message === "success") {
      window.localStorage.setItem("userId", response.data._id);

      router.push(
        `/room?room-id=${response.data.gameId}&user-id=${response.data._id}`,
        { scroll: false }
      );
    }
  };

  const StartPairing = () => {
    router.push(
      `/game-started?room-id=${"users.data.gameId"}&user-id=${"users.data._id"}`,
      { scroll: false }
    );
  };
  const StartGame = () => {
    router.push(`/started`, { scroll: false });
  };

  return (
    <>
      <div className="px-10 pb-0 relative  overflow-hidden bg-home-bg bg-cover bg-no-repeat">
        <input
          type="text"
          placeholder="your name"
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <div>
          <button onClick={SubmitInputInfo}>Submit</button>
        </div>
        <div>
          <button onClick={StartPairing}>Start Pairing</button>
        </div>
        <button onClick={StartGame}>Start Game</button>
      </div>
    </>
  );
}

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

    if (true) {
      window.localStorage.setItem("userId", "response.data._id");

      router.push(
        `/room?room-id=${"response.data.gameId"}&user-id=${"response.data._id"}`,
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
        <div
          className="p-5 rounded-lg w-[50%]"
          style={{ margin: "25px auto", background: "lightblue" }}
        >
          <h2 className="text-black text-lg font-semibold text-center py-5">
            Enter Your Name To Start
          </h2>
          <input
            type="text"
            placeholder="your name"
            onChange={(e: any) => {
              setName(e.target.value);
            }}
            className="p-2 bg-[#e7e7e7] w-[15rem] flex m-auto"
            style={{ border: "1px solid #909090;", borderRadius: "8px" }}
          />
          <div className="flex m-auto py-5">
            <button
              className="text-black flex m-auto"
              style={{
                border: "1px solid #909090;",
                borderRadius: "8px",
                padding: "8px 20px",
              }}
              onClick={SubmitInputInfo}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="text-black flex m-auto mr-5"
            style={{
              border: "1px solid #909090;",
              borderRadius: "8px",
              padding: "8px 20px",
            }}
            onClick={StartPairing}
          >
            Start Pairing
          </button>

          <button
            className="text-black flex m-auto "
            style={{
              border: "1px solid #909090;",
              borderRadius: "8px",
              padding: "8px 20px",
            }}
            onClick={StartGame}
          >
            Start Game
          </button>
        </div>
      </div>
    </>
  );
}

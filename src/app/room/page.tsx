"use client";
import { socket } from "@/api/methods";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({}) => {
  const [users, setUsers] = useState<any[]>([]);
  const searchParams = useSearchParams();

  const roomId = searchParams.get("room-id")?.toLocaleLowerCase();
  const userId = searchParams.get("user-id")?.toLocaleLowerCase();

  useEffect(() => {
    if (socket.connected) {
      socket.emit("OneAndOneStarted", roomId);
      socket.on("OneAndOneStarted", (data: any) => {
        setUsers(data);
      });
    }
  }, []);
  return (
    <>
      <div
        className="container flex justify-center p-6 w-[50%] text-[#000] rounded-lg"
        style={{
          margin: "0 auto",
          borderRadius: "8px;",
          background: "lightblue",
        }}
      >
        <div className="d-flex flex-col my-12">
          {users?.map((data: any, idx: number) => {
            return <h4 key={idx}> {data.name}</h4>;
          })}
          {users.length < 1 && <h4>{window.localStorage.userInfo}</h4>}
        </div>
      </div>
    </>
  );
};

export default Page;

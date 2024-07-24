"use client";
import { fetchUserData, postUserInfo, socket } from "@/api/methods";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({}) => {
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<any[]>([]);

  const roomId = searchParams.get("room-id")?.toLocaleLowerCase();
  const userId = searchParams.get("user-id")?.toLocaleLowerCase();

  const fethData = async () => {
    const response = (await fetchUserData(`users:${userId}`)) as any;
    if (response.Response.message === "success") {
      setUsers([...users, response]);
    }
  };
  useEffect(() => {
    fethData();
  }, []);

  return (
    <div
      className="container flex justify-center p-6 w-[50%] text-[#000] rounded-lg"
      style={{
        margin: "0 auto",
        borderRadius: "8px;",
        background: "lightblue",
      }}
    >
      {users?.map((data: any, index: number) => {
        if (data.gameId === roomId)
          return (
            <div key={index} className="d-flex justify-between items-center">
              <h4 className="px-10 py-5">{data.name}</h4>
              <h4 className="px-10 py-5">
                {window.localStorage.getItem("userInfo")}
              </h4>
            </div>
          );
      })}
      {/* <div className="d-flex justify-between items-center">
        <h4 className="px-10 py-5">Deepraj</h4>
        <h4 className="px-10 py-5">Nawroz</h4>
      </div> */}
    </div>
  );
};

export default Page;

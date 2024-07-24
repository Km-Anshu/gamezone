import { io } from "socket.io-client";

export const url = "http://localhost:3000/api/users/v1/x";

export const postUserInfo = async (params = "", body: any) => {
  const response = await fetch(`${url}/${params}`, {
    headers: { "Content-Type": "application/json" },

    method: "POST",
    body: JSON.stringify(body),
  });

  const result: { data: any } = await response.json();
  return result;
};

const connectToSocket = () => {
  const socket = io(url, {
    // transports: ["websocket", "polling"],
  });
  return socket;
};

export const socket = connectToSocket();

export const fetchUserData = async (params = "") => {
  const response = await fetch(`${url}/${params}`, {
    method: "GET",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ amount }),
  });
  const result: { data: any } = await response.json();

  return result;
};

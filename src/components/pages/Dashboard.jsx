import React from "react";
import Sidebar from "../Sidebar/sidebar";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user } = useSelector((store) => store.user);
  return (
    <div className="flex">
      {user?.role == "librarian" ? (
        <>
          <Sidebar />
          <div className="m-3 md:m-10 w-[82%] rounded-md">
            <p className="font-bold text-xl">👋 Welcome {user?.name}</p>
          </div>
        </>
      ) : user?.role == "user" ? (
        <>
          {" "}
          <Sidebar />
          <div className="m-3 md:m-10 w-[82%] rounded-md">
            <p className="font-bold text-xl">👋 Welcome {user?.name}</p>
          </div>
        </>
      ) : (
        <>
          <Sidebar />
          <div className="m-3 md:m-10 w-[82%] rounded-md">
            <p className="font-bold text-xl">👋 Welcome {user?.name}</p>
          </div>
        </>
      )}
    </div>
  );
}

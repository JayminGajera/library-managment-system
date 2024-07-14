import React from "react";
import Sidebar from "../Sidebar/sidebar";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user } = useSelector((store) => store.user);
  return (
    <div className="flex">
      <Sidebar />
      <div className="m-3 md:m-10 w-[82%] rounded-md">
        <p className="font-bold text-xl">👋 {user?.gymName}</p>{" "}
        <p className="ml-8">Welcome to FitAdmin !</p>
      </div>
    </div>
  );
}

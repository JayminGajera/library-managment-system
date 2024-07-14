import React from "react";
import Sidebar from "../Sidebar/sidebar";
import { useSelector } from "react-redux";
import Librarian from "./Librarian";
import User from "./User";
import Admin from "./Admin";

export default function Dashboard() {
  const { user } = useSelector((store) => store.user);
  return (
    <div className="flex">

      {
      user?.role == "librarian" ? (
        <>
          <Sidebar />
          <Librarian/>
        </>
      ) : user?.role == "user" ? (
        <>
          {" "}
          <Sidebar />
          <User />
          
        </>
      ) : user?.role == "admin" (
        <>
          <Sidebar />
          <Admin />
        </>
      )
      }

    </div>
  );
}

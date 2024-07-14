import React from "react";
import Sidebar from "../Sidebar/sidebar";
import { useSelector } from "react-redux";
import Librarian from "./Librarian";
import User from "./User";
import Admin from "./Admin";
import ReturnBook from "./ReturnBook";

export default function Dashboard() {
  const { user } = useSelector((store) => store.user);
  return (
    <div className="flex">
      {user?.role == "librarian" ? (
        <>
          <Sidebar />
          <Librarian />
          <ReturnBook />
        </>
      ) : user?.role == "user" ? (
        <>
          {" "}
          <Sidebar />
          <User />
        </>
      ) : (
        
          <>
            <Sidebar />
            <Admin />
          </>
        )
      }
    </div>
  );
}

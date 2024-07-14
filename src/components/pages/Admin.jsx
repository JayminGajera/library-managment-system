import React from "react";
import Sidebar from "../Sidebar/sidebar";


const Admin = () => {
    const { user } = useSelector((store) => store.user);
  return (
    <div className="m-3 md:m-10 w-[82%] rounded-md">
      <p className="font-bold text-xl">👋 Welcome {user?.name}</p>
    </div>
  );
};

export default Admin;

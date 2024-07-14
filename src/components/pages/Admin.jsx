import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import { useSelector } from "react-redux";
import axios from "axios";

const Admin = () => {
  const { user } = useSelector((store) => store.user);
  const [cardData, setCardData] = useState();

  useEffect(() => {
    getAnalytics();
  }, []);

  const getAnalytics = async () => {
    try {
      const data = await axios.get(
        `http://192.168.116.226:8055/books/getDashboard`
      );

      console.log("data ", data);

      if (data?.data?.success) {
        setCardData(data?.data?.data);
      }
    } catch (error) {
      console.log("Error while get data");
    }
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="m-3 md:m-10 rounded-md">
        <div className="flex gap-x-2 ">
          <div className="border rounded-md p-2 mt-2 font-bold">
            Total Books : {cardData?.totalBooks}
          </div>
          <div className="border rounded-md p-2 mt-2 font-bold">
            Total Borrowings : {cardData?.totalBorrowings}
          </div>
          <div className="border rounded-md p-2 mt-2 font-bold">
            Total User : {cardData?.totalUsers}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

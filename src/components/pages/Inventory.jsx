import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const [books, setBooks] = useState([]);
  const [serach,setSearch] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const book = await axios.get(
        `http://192.168.116.226:8055/books/getBooks`
      );

      console.log("books ", book);
      setBooks(book?.data);
    } catch (error) {
      console.log("Error while getting books");
    }
  };

  return (
    <div className="w-full px-10">
      <div className="flex justify-between m-2">
        <FaArrowLeft onClick={() => navigate(-1)} className="text-2xl" />
        <input onChange={(e) => setSearch(e.target.value)} placeholder="serach book" className="border rounded-md p-2" type="text" />
      </div>
      <div className="text-black px-4">
        {books?.map((book, index) => (
          <div
            key={index}
            className="border rounded-md p-4 flex flex-col-3 items-center mt-2"
          >
            {book?.image ? (
              <img
                className="w-[10rem] h-[15rem]"
                src={book?.image}
                alt={book?.title}
              />
            ) : (
              <img
                className="w-[10rem] h-[15rem]"
                src={`https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`}
                alt="No Image Available"
              />
            )}
            <div className="mt-2 ml-2">
              <div className="text-black font-bold">{book?.title}</div>
              <div className="text-black">{book?.author}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;

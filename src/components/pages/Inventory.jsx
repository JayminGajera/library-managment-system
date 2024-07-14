import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Inventory = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [isbn, setIsbn] = useState("");
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

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );


  const handleAddBook =async() => {
try {
  const addedbook =await axios.post(`http://192.168.116.226:8055/books/addBookFromApi`,{
    isbn
  });

  // if(addedbook?.)
  console.log("book ",addedbook)

  if(!!addedbook){
    toast("Book added succesfully")
  }else{
    toast("book not found with this isbn")
  }
} catch (error) {
  console.log("Error while add book")
}
  }
  return (
    <div className="w-full px-10 flex">
      <Sidebar />
      <div className="text-black px-4">
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search book"
          className="border rounded-md p-2 mt-2 mr-2"
          type="text"
        />

        <input
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="Enter Book ISBN"
          className="border rounded-md p-2 mt-2 mr-2"
          type="text"
        />
        <Button onClick={handleAddBook}>Add Book</Button>
        {filteredBooks.map((book, index) => (
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

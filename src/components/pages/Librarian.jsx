import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { Label } from "@radix-ui/react-label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const Librarian = () => {
  const { user } = useSelector((store) => store.user);
  const [books, setBooks] = useState([]);
  const [emails, setEmails] = useState([]);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooksAndEmails = async () => {
      try {
        const booksResponse = await axios.get("http://192.168.116.226:8055/books/getAvailableBooks");
        const usersResponse = await axios.get("http://192.168.116.226:8055/user/userList");

        if (booksResponse.data && usersResponse.data.data) {
          setBooks(booksResponse.data);
          setEmails(usersResponse.data.data);
          console.log({books,emails});
        }
      } catch (error) {
        console.error("Error fetching books and emails data", error);
        toast.error("Error fetching books and emails data");
      }
    };

    if (isIssueModalOpen) {
      fetchBooksAndEmails();
    }
  }, [isIssueModalOpen]);

  const formik = useFormik({
    initialValues: {
      isbn: "",
      email: "",
      days: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required"),
      isbn: Yup.string().required("ISBN is required"),
      days: Yup.string().required("Days required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("values ",values);
        const response = await axios.post("http://192.168.116.226:8055/books/issueBook", values);

        toast.success(response.data.message);
        setIsIssueModalOpen(false); // Close Issue Book modal on success
      } catch (error) {
        console.error("Error while issuing book", error);
        toast.error("Error while issuing book");
      }
    },
  });

  return (
    <div className="m-3 md:m-10 w-[82%] rounded-md">


      <Dialog open={isIssueModalOpen} onOpenChange={setIsIssueModalOpen}>
        <DialogTrigger asChild>
          <Button className="flex">Issue Book</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="isbn">ISBN</Label>
                  <select
                    id="isbn"
                    {...formik.getFieldProps("isbn")}
                    className="border rounded p-1 w-full"
                  >
                    <option value="">Select ISBN</option>
                    {books?.map((book) => (
                      <option key={book.isbn} value={book.isbn}>
                        {book.title} - {book.isbn}
                      </option>
                    ))}
                  </select>
                  {formik.touched.isbn && formik.errors.isbn ? (
                    <p className="text-red-500 text-xs">{formik.errors.isbn}</p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Member</Label>
                  <select
                    id="email"
                    {...formik.getFieldProps("email")}
                    className="border rounded p-1 w-full"
                  >
                    <option value="">Select Member</option>
                    {emails?.map((email) => (
                      <option key={email} value={email?.email}>
                        {email.userName}
                      </option>
                    ))}
                  </select>
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-red-500 text-xs">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="days">Days</Label>
                  <Input
                    id="days"
                    type="text"
                    {...formik.getFieldProps("days")}
                    placeholder="Enter Number of Days"
                  />
                  {formik.touched.days && formik.errors.days ? (
                    <p className="text-red-500 text-xs">{formik.errors.days}</p>
                  ) : null}
                </div>
              </div>
              <Button type="submit" className="w-full mt-5">
                Issue Book
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Librarian;

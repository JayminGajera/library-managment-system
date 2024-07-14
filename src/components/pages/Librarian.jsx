import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRScanner from "./QRScanner";
import { MdQrCodeScanner } from "react-icons/md";
import axios from "axios";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { toast } from "sonner";

const Librarian = () => {
  const { user } = useSelector((store) => store.user);
  const [loading, setLoading] = useState(false);
  const [issueBookModalOpen, setIssueBookModalOpen] = useState(false);

  const afterScan = async (isbn) => {
    // Handle scan result
    // try {
    //   const bookData = await axios.get(
    //     `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    //   );
    //   let addBook;
    //   {
    //     bookData &&
    //       (addBook = await axios.post(
    //         `http://192.168.116.226:8055/books/addBook`,
    //         {
    //           isbn: bookData?.data?.items[0]?.volumeInfo?.industryIdentifiers[0]
    //             .identifier,
    //           title: bookData?.data?.items[0]?.volumeInfo?.title,
    //           author: bookData?.data?.items[0]?.volumeInfo?.authors,
    //         }
    //       ));
    //   }

    //   console.log("book data ", bookData);
    //   console.log("add book data ", addBook);
    //   setBook()
    // } catch (error) {
    //   console.log("Error while book data fetch");
    // }
  };

  const formik = useFormik({
    initialValues: {
      isbn: "",
      email: "",
      days: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      isbn: Yup.string().required("Isbn is required"),
      days: Yup.string().required("Days required"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted", values);
      setLoading(true);

      try {
        const response = await axios.post(
          "http://192.168.116.226:8055/books/issueBook",
          values
        );

        console.log("res ", response);
        if (response) {
          toast(response?.data?.message);
          setIssueBookModalOpen(false); // Close the modal on success
        } else {
          toast(response?.data?.message);
        }
      } catch (error) {
        console.log("Error while issuing book");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="m-3 md:m-10 w-[82%] rounded-md">
      <p className="font-bold text-xl">👋 Welcome {user?.name}</p>

      <Dialog>
        <DialogTrigger>
          <MdQrCodeScanner className="text-4xl" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <QRScanner afterScan={afterScan} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={issueBookModalOpen} onOpenChange={setIssueBookModalOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIssueBookModalOpen(true)}>Issue Book</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    type="text"
                    {...formik.getFieldProps("isbn")}
                    placeholder="Enter ISBN"
                  />
                  {formik.touched.isbn && formik.errors.isbn ? (
                    <p className="text-red-500 text-xs">{formik.errors.isbn}</p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    {...formik.getFieldProps("email")}
                    placeholder="Enter Your Email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-red-500 text-xs">{formik.errors.email}</p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="days">Days</Label>
                  <Input
                    id="days"
                    type="text"
                    {...formik.getFieldProps("days")}
                    placeholder="Enter Your days"
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

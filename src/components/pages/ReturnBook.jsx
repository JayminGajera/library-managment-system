import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import QRScanner from "./QRScanner";
import { MdQrCodeScanner } from "react-icons/md";
import { toast } from "sonner";

const ReturnBook = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const afterScan = async (isbn) => {
    try {
      const bookData = await axios.post(
        `http://192.168.116.226:8055/books/returnBook`,
        {
          isbn,
        }
      );
      // Close the dialog after successful scan
      setIsDialogOpen(false);
      console.log("issue book data ", bookData);
      if (bookData?.data?.success) {
        toast(bookData?.data?.message);
      } else {
        toast(bookData?.data?.message);
      }
    } catch (error) {
      console.log("Error while fetching book data");
    }
  };

  return (
    <div className="m-3 md:m-10 w-[82%] rounded-md">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <MdQrCodeScanner
            className="text-4xl"
            onClick={() => setIsDialogOpen(true)}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <QRScanner afterScan={afterScan} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReturnBook;

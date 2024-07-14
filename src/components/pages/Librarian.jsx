import React from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRScanner from "./QRScanner";
import { MdQrCodeScanner } from "react-icons/md";

const Librarian = () => {
  const { user } = useSelector((store) => store.user);

  const afterScan = () => {};

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
    </div>
  );
};

export default Librarian;

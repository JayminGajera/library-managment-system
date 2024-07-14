import React from "react";
import QrReader from "react-qr-scanner";
import { toast } from "sonner";

const QRScanner = ({ afterScan }) => {
  const handleError = () => {
    toast("QR is not valid");
  };

  const handleScan = (data) => {
    if (data) {
      console.log("qr data ", data);
      afterScan(data?.text);
    }
  };
  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default QRScanner;

import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import { toast } from "sonner";

const QRScanner = ({ afterScan }) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleError = () => {
    toast("QR is not valid");
  };

  const handleScan = (data) => {
    if (data && !isScanning) {
      setIsScanning(true);
      console.log("qr data ", data);
      afterScan(data?.text);
      // Reset scanning state after a delay to allow for subsequent scans
      setTimeout(() => setIsScanning(false), 2000); // Adjust delay as needed
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

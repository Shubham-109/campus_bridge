"use client";
import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

interface PdfViewerProps {
  pdfFileName: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfFileName }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [tempFileURL, setTempFileURL] = useState("");
  const firebaseConfig = {
    apiKey: "AIzaSyDrgahN63nq3w9y1hYpuVwWezw6vlYitoU",
    authDomain: "campusbridge-120b3.firebaseapp.com",
    projectId: "campusbridge-120b3",
    storageBucket: "campusbridge-120b3.appspot.com",
    messagingSenderId: "953464357643",
    appId: "1:953464357643:web:013dc694576efcb1fe580e",
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  async function fetchPdfUrlFromStorage(
    pdfFileName: string
  ): Promise<string | null> {
    try {
      const pdfRef = ref(storage, `dot_resources/${pdfFileName}`);
      const pdfUrl = await getDownloadURL(pdfRef);
      return pdfUrl;
    } catch (error) {
      console.log("Error fetching PDF from Firebase Storage:" + error);
      return null;
    }
  }

  useEffect(() => {
    fetchPdfUrlFromStorage(pdfFileName).then((url) => {
      setPdfUrl(url);
    });
  }, [pdfFileName]);

  return (
    <div className="h-[calc(100vh)] w-full">
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="100%"
          className="text-zinc-300 h-[calc(100vh)] w-full overflow-auto"
        ></iframe>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PdfViewer;

import { useState, ChangeEvent } from "react";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, `dot_resources/${file.name}`);
      const metadata = {
        contentType: "application/pdf",
      };
      const uploadTask = uploadBytes(storageRef, file, metadata);
      uploadTask.then((snapshot) => {});
      setUploading(true);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button onClick={handleUpload}>Upload</button>
      {uploading && <p>Uploading: {uploadProgress}%</p>}
    </div>
  );
};

export default FileUpload;

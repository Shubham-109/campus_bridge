"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useState, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import PdfViewer from "../pdfViewer";
import FileUpload from "./fileUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const subjects = [
    {
      title: "Advanced  Database  Management",
      description:
        "This course will introduce the students the knowledge of various types of database systems with advanced querying for decision support system and information retrieval etc",
      file: "adbms",
    },
    {
      title: "Distributed  and  Cloud  Computing",
      description:
        "This course provides an introduction to the fundamentals of distributed systems and cloud computing. The main goal of a distributed system is to make it easy for users to access remote resources, and share them with other users in a controlled manner. The main purpose of cloud computing is the delivery of different services through the Internet. These resources include tools and applications like data storage, servers, databases, networking, and software.",
      file: "dcs",
    },
    {
      title: "Advanced  Network  Engineering",
      description:
        "The objective of the course is to familiarize students with basics and Advance Networking. This course is designed to produce networking professionals capable of implementing, administering, and maintaining Networks and overall systems with the knowledge of the Windows Server 2008 through its internal working of the core components and introduction to Linux services, protocols and Microsoft Azure Cloud services",
      file: "ane",
    },
  ];
  const roadmaps = [
    {
      title: "Frontend Development",
      description: "",
      file: "frontend.pdf",
    },
    {
      title: "Backend Development",
      description: "",
      file: "backend.pdf",
    },
    {
      title: "Fullstack Development",
      description: "",
      file: "full-stack.pdf",
    },
    {
      title: "React",
      description: "",
      file: "react.pdf",
    },
    {
      title: "DevOps ",
      description: "",
      file: "devops.pdf",
    },
    {
      title: "Flutter Development ",
      description: "",
      file: "flutter.pdf",
    },
    {
      title: "Android Development ",
      description: "",
      file: "android.pdf",
    },
    {
      title: "SQL ",
      description: "",
      file: "sql.pdf",
    },
    {
      title: "Blockchain Development ",
      description: "",
      file: "blockchain.pdf",
    },
  ];
  const [selectedContent, setContent] = useState({
    title: "",
    description: "",
    file: "",
  });

  function handleContentClick(content: any) {
    setContent(content);
  }
  const firebaseConfig = {
    apiKey: "AIzaSyDrgahN63nq3w9y1hYpuVwWezw6vlYitoU",
    authDomain: "campusbridge-120b3.firebaseapp.com",
    projectId: "campusbridge-120b3",
    storageBucket: "campusbridge-120b3.appspot.com",
    messagingSenderId: "953464357643",
    appId: "1:953464357643:web:013dc694576efcb1fe580e",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [items, setItems] = useState<any[]>([]);
  const isFirstRender = useRef(true);

  const fetchItemsFromFirestore = async () => {
    try {
      const col = collection(db, "resources");
      const itemSnapshot = await getDocs(col);
      const data = itemSnapshot.docs.map((doc) => doc.data());
      data.forEach((item) => {
        console.log(item);
      });
      setItems(data);
    } catch (error) {
      console.log("Error fetching data from Firestore:" + error);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchItemsFromFirestore();
  }, []);

  return (
    <div className="w-screen text-zinc-300   bg-slate-950 flex flex-col justify-center items-center">
      <div className="w-[calc(75vw)] flex flex-row justify-between  items-center p-4 border-b border-zinc-800">
        <div className="text-md text-white font-semibold">
          The Campus Bridge
        </div>
        {/* <Link href="/auth/profile">
          <div className="text-zinc-300 text-lg px-20 py-5">Profile</div>
        </Link> */}
        <div className="relative w-96">
          <span className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            className="pl-10 pr-4 py-[7px] w-full bg-transparent rounded-md border border-zinc-700 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-600"
            type="text"
            placeholder="Search"
          />
        </div>
        <UserButton />
      </div>
      <div className="flex flex-row bg-slate-950 w-[calc(75vw)] h-screen">
        <div className="w-[calc(20vw)] overflow-y-auto">
          {/* Section 1 content */}
          <div className="p-4 text-zinc-500 flex flex-col justify-items-start">
            <h2 className="pt-10 py-4 px-4 text-zinc-200 font-semibold text-sm">
              Subjects
            </h2>
            {subjects.map((subject) => (
              <div>
                {" "}
                <button
                  className={`py-3  px-4 text-sm ${
                    selectedContent.file == subject.file
                      ? "bg-primary-green primary-green font-semibold rounded-lg"
                      : "text-white font-extralight"
                  }`}
                  onClick={() => handleContentClick(subject)}
                >
                  {subject.title}
                </button>
              </div>
            ))}
            <h2 className="pt-16 py-4 px-4 text-zinc-200 font-semibold text-sm">
              Roadmaps
            </h2>
            {roadmaps.map((subject) => (
              <div>
                <button
                  className={`py-3  px-4 text-sm ${
                    selectedContent.file == subject.file
                      ? "bg-primary-green primary-green font-semibold rounded-lg"
                      : "text-white font-extralight"
                  }`}
                  onClick={() => handleContentClick(subject)}
                >
                  {subject.title}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[calc(60vw)] overflow-y-auto flex flex-col px-5 ">
          {/* <div>
            <FileUpload />
          </div> */}
          <div className="text-md primary-green pt-8 font-semibold">
            {selectedContent.title}
          </div>
          <div className="text-md text-zinc-400 font-light pt-5 pb-8">
            {selectedContent.description}
          </div>
          <div className="pb-5 h-[calc(100vh)]">
            {selectedContent.file == "" ? (
              <div className="flex justify-center items-center h-96 text-2xl">
                <h1>Please select a topic...</h1>
              </div>
            ) : (
              <PdfViewer pdfFileName={selectedContent.file}></PdfViewer>
            )}
          </div>
        </div>
      </div>
      {/* <h1 className="text-zinc-300 text-9xl">Home {items.length}</h1> */}
    </div>
  );
}

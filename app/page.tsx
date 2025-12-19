"use client"
import Image from "next/image";
import { useContext } from "react";
import { QuizeContext } from "./context/QuizeContext";
import QuizQuestionsPage from "./QuizePage/page";
import HomePage from "./HomePage/page";

export default function Home() {
  const {name} = useContext(QuizeContext)
  console.log(name);
  return (
    <div>
         <HomePage/>  
    </div>
  );
}

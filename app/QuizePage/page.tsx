"use client"
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QuizeContext } from "../context/QuizeContext";
import QuizeEnd from "../QuizeEnd/page";

export default function QuizQuestionsPage() {
  const questions = [
    {
      id: 1,
      question: "ಭಾರತದ ರಾಜಧಾನಿ ಯಾವುದು?",
      options: ["ಬೆಂಗಳೂರು", "ದೆಹಲಿ", "ಮೈಸೂರು", "ಕೋಲ್ಕತ್ತಾ"],
      answer: "ದೆಹಲಿ",
    },
    {
      id: 2,
      question: "ಭೂಮಿಯ ಉಪಗ್ರಹ ಯಾವುದು?",
      options: ["ಸೂರ್ಯ", "ಚಂದ್ರ", "ಕುಜ", "ನಕ್ಷತ್ರ"],
      answer: "ಚಂದ್ರ",
    },
    {
      id: 3,
      question: "ವಿದ್ಯುತ್ ಅನ್ನು ಯಾರು ಕಂಡುಹಿಡಿದರು?",
      options: ["ನ್ಯೂಟನ್", "ಎಡಿಸನ್", "ಫರಡೇ", "ಐನ್‌ಸ್ಟೈನ್"],
      answer: "ಫರಡೇ",
    }
  ];

  const {currentQuestion,IsLoading,selected,setSelected,nextQuestion,questNo,checkingAnswer,time,showAnswer,chances,score,handleQuizeRet}=useContext(QuizeContext);
  const [index, setIndex] = useState(questNo);
  const q = currentQuestion

  function submitAnswer() {
      checkingAnswer(questNo,selected)
  }

  return ( 
    <>
    {
      IsLoading  ? (
        null 
      ):(
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8 border border-slate-200"
        >
      {
        chances===0 ? (
          null
        ):(
        <div>
        {/* Score + Progress */}
        <div className="mb-6 flex justify-between items-center bg-sky-50 border border-sky-100 rounded-xl px-5 py-4 shadow-sm">
          <div>
            <p className="text-xs text-slate-500">ಸ್ಕೋರ್</p>
            <p className="text-xl font-bold text-sky-700">{score}</p>
          </div>
          {/* <div className="text-right">
            <p className="text-xs text-slate-500">ಪ್ರಗತಿ</p>
            <p className="text-xl font-bold text-slate-700">{questNo + 1}</p>
          </div> */}
          <div className="">
            <p className="text-xs text-slate-500">Timing</p>
            <p style={{fontSize:"30px"}}><span className="text-center mr-2 mt-8">{time}</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Chances</p>
            <p className="text-xl font-bold text-slate-700">{chances}</p>
          </div>
        </div>

        {/* Question Box */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">{q.question}</h2>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {q.options.map((op, i) => (
            <button
              key={i}
              onClick={() => setSelected(op)}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all shadow-md font-medium
                ${selected === op ? "bg-sky-100 border-sky-400" : "bg-white border-slate-200 hover:bg-slate-100"}`}
            >
              {op}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        {!showAnswer && selected && (
          <button
            onClick={submitAnswer}
            className="mt-6 w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            ಸಲ್ಲಿಸಿ
          </button>
        )}

        {/* Answer Section */}
        {showAnswer && (
          <div className={`mt-6 p-4 rounded-xl text-center font-semibold border shadow-md
            ${selected[0] === q.answer ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-rose-50 border-rose-200 text-rose-700"}`}
          >
            {selected[0] === q.answer ? "✔ ಸರಿಯಾದ ಉತ್ತರ!" : `✘ ತಪ್ಪಾಗಿದೆ! ಸರಿಯಾದ ಉತ್ತರ: ${q.answer}`}
          </div>
        )}

        {/* Navigation */}
        {showAnswer && index < questions.length - 1 && (
          <button
            onClick={()=>nextQuestion()}
            className="mt-6 w-full bg-slate-800 hover:bg-black text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            ಮುಂದಿನ ಪ್ರಶ್ನೆ
          </button>
        )}
        </div>
        )
      } 
        { chances===0 &&  (
          <div className="mt-6 text-center font-bold text-slate-700 text-xl">
            <QuizeEnd/>sd
            {/* 🎉 ಕ್ವಿಜ್ ಮುಗಿದಿದೆ! ನಿಮ್ಮ ಸ್ಕೋರ್: {score} / {questions.length}
            <button onClick={()=>handleQuizeRet()}>Take Quize</button> */}
          </div>
        )}
      </motion.div>
    </div>
    )
  }
    </> 
  );
}
"use client"

import React, { useContext } from "react";
import { motion } from "framer-motion";
import { QuizeContext } from "../context/QuizeContext";
import { useRouter } from "next/navigation";

export default function QuizeEnd() {
    const router=useRouter();
    const {score,questNo,onRetry}=useContext(QuizeContext)
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-10 border border-rose-200 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-28 h-28 rounded-full bg-rose-100 flex items-center justify-center shadow-md"
        >
          <span className="text-4xl">💔</span>
        </motion.div>

        <h1 className="text-3xl font-extrabold text-rose-700 mt-6">ಅಯ್ಯೋ! ನೀವು ಸೋತಿದ್ದೀರಿ</h1>
        <p className="text-slate-600 mt-2 text-sm">ಚಿಂತಿಸಬೇಡಿ! ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ ಮತ್ತು ಉತ್ತಮ ಸ್ಕೋರ್ ಮಾಡಿ.</p>

        {/* Score Card */}
        <div className="mt-8 bg-gradient-to-r from-rose-50 to-rose-100 border border-rose-200 rounded-2xl p-5 shadow-md">
          <p className="text-sm text-slate-500">ನಿಮ್ಮ ಸ್ಕೋರ್</p>
          <p className="text-4xl font-bold text-rose-700 mt-1">{score} / {questNo*5}</p>
        </div>

        {/* Retake Button */}
        <button
          onClick={()=>onRetry(router)}
          className="w-full mt-8 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all"
        >
          ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ
        </button>

        {/* Back Home */}
        <a
          href="/"
          className="inline-block mt-4 text-sm text-rose-600 hover:underline"
        >
          ಹೋಮ್ ಪುಟಕ್ಕೆ ಹೋಗಿ →
        </a>
      </motion.div>
    </div>
  );
}
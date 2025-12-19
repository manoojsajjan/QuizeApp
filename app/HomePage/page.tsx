"use client"
import { useContext, useEffect,useState } from "react";
import { motion } from "framer-motion";
import { QuizeContext } from "../context/QuizeContext";
import { easyQuestion } from "../easyQuestions";
import {hardQuestions} from '../hardQuestions'

export default function HomePage() {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("general");
  const [agree, setAgree] = useState(false);
  const [touched, setTouched] = useState(false);
  const {nameSetting,setQuestionsMethod}=useContext(QuizeContext)
  

  useEffect(() => {
    const saved = localStorage.getItem("quiz_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setName(parsed.name || "");
        setDifficulty(parsed.difficulty || "easy");
        setCategory(parsed.category || "general");
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "quiz_user",
  //     JSON.stringify({ name, difficulty, category })
  //   );
  // }, [name, difficulty, category]);

  const valid = name.trim().length >= 2 && agree;

  function handleStart(e) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;

    const payload = { name: name.trim(), difficulty, category };
    if(difficulty==="easy"){
      setQuestionsMethod(easyQuestion)
  
    }else{
      setQuestionsMethod(hardQuestions)
    }

    nameSetting(name,difficulty);
    window.location.href = `/QuizePage`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-200"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
              ಕನ್ನಡ ಸ್ಪರ್ಧಾತ್ಮಕ ಕ್ವಿಜ್
            </h1>
            <p className="mt-3 text-slate-600">
              ನಿಮ್ಮ ಹೆಸರು നൽകി, ಕಠಿಣತೆ ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಸವಾಲನ್ನು ಸ್ವೀಕರಿಸಿ. ಉತ್ತಮ ಪ್ರಭಾತ!
            </p>

            <form className="mt-6 space-y-5" onSubmit={handleStart}>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">ಹೆಸರು</span>
                <input
                  aria-label="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="ನಿಮ್ಮ ಹೆಸರು"
                  className={`mt-2 block w-full rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-sky-300 transition-shadow 
                    ${touched && name.trim().length < 2 ? "border-red-300 ring-red-100" : "border-slate-200"}`}
                />
                {touched && name.trim().length < 2 && (
                  <p className="text-xs text-red-600 mt-1">ಹೆಸರು ಕನಿಷ್ಠ 2 ಅಕ್ಷರಗಳು ಇರಬೇಕು.</p>
                )}
              </label>

              <div>
                <span className="text-sm font-medium text-slate-700">ಕಠಿಣತೆ</span>
                <div className="mt-3 flex gap-3">
                  <label className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg border ${difficulty === 'easy' ? 'bg-sky-50 border-sky-200' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="difficulty"
                      value="easy"
                      checked={difficulty === "easy"}
                      onChange={() => setDifficulty("easy")}
                      className="accent-sky-500"
                    />
                    <div>
                      <div className="text-sm font-semibold">ಸುಲಭ</div>
                      <div className="text-xs text-slate-500">ಮೂಲಭೂತ ಮತ್ತು GyK ರೀತಿಯ ಪ್ರಶ್ನೆಗಳು</div>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg border ${difficulty === 'hard' ? 'bg-rose-50 border-rose-200' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="difficulty"
                      value="hard"
                      checked={difficulty === "hard"}
                      onChange={() => setDifficulty("hard")}
                      className="accent-rose-500"
                    />
                    <div>
                      <div className="text-sm font-semibold">ಕಠಿಣ</div>
                      <div className="text-xs text-slate-500">ಆಧುನಿಕ ಹಾಗೂ ಉನ್ನತ ಮಟ್ಟದ ಪ್ರಶ್ನೆಗಳು</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* <div>
                <label className="text-sm font-medium text-slate-700">ವಿಷಯ</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 block w-full rounded-lg px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option value="general">ಸಾಮಾನ್ಯ ಜ್ಞಾನ</option>
                  <option value="history">ಇತಿಹಾಸ</option>
                  <option value="geography">ಭೂಗೋಳ</option>
                  <option value="science">ವಿಜ್ಞಾನ</option>
                  <option value="reasoning">ತರ್ಕಶೀಲತೆ</option>
                </select>
              </div> */}

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="accent-sky-500"
                />
                <span className="text-slate-600">ನಾನು ನಿಯಮ ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಓದಿದ್ದೇನೆ ಮತ್ತು ಒಪ್ಪುತ್ತೇನೆ</span>
              </label>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={!valid}
                  className={`inline-flex items-center gap-3 px-5 py-3 rounded-lg font-semibold shadow-sm transition-all 
                    ${valid ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-md' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  ಪ್ರಾರಂಭಿಸಿ
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setDifficulty("easy");
                    setCategory("general");
                    setAgree(false);
                    setTouched(false);
                    localStorage.removeItem('quiz_user');
                  }}
                  className="text-sm px-4 py-2 rounded-md border border-slate-200 text-slate-700"
                >
                  ಮರುಹೊಂದಿಸಿ
                </button>

                <div className="ml-auto text-xs text-slate-500">ಪ್ರಶ್ನೆಗಳ ಸಂಖ್ಯೆ: <span className="font-medium">500</span></div>
              </div>
            </form>
          </div>

          <aside className="w-full sm:w-72 bg-gradient-to-b from-white to-sky-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold">ಕ</div>
              <div>
                <div className="text-sm font-semibold">ಸ್ವಾಗತ!</div>
                <div className="text-xs text-slate-500">ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಕ್ವಿಜ್</div>
              </div>
            </div>

            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-sky-400" />
                <div>
                  <div className="font-medium">ಟೈಮ್‌ಡೆಡ್ ಕ್ವಿಜ್</div>
                  <div className="text-xs text-slate-500">ಪ್ರತಿ ಪ್ರಶ್ನೆಗೆ ಸಮಯವನ್ನು ಸೆಟ್ ಮಾಡಿ</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-rose-400" />
                <div>
                  <div className="font-medium">ಟ್ರ್ಯಾಕ್ ಸ್ಕೋರ್</div>
                  <div className="text-xs text-slate-500">ಪ್ರಗತಿಯನ್ನು ನಂತರ ನೋಡಬಹುದು</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-400" />
                <div>
                  <div className="font-medium">ಕಷ್ಟತೆ ಆಯ್ಕೆ</div>
                  <div className="text-xs text-slate-500">ಸುಲಭದಿಂದ ಕಠಿಣವರೆಗೆ</div>
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <div className="text-xs text-slate-500">ಟಿಪ್</div>
              <div className="text-sm font-medium mt-1">ಪ್ರಶ್ನೆಗಳಿಗೆ ಸ್ಪಷ್ಟವಾಗಿ ಉತ್ತರಿಸಿ ಮತ್ತು ಸಮಯ ನೋಡಿಕೊಳ್ಳಿ.</div>
            </div>
          </aside>
        </div>

        <footer className="mt-6 text-xs text-slate-500">Prepared with ❤ — Kannada Quiz • 2025</footer>
      </motion.div>
    </div>
  );
}

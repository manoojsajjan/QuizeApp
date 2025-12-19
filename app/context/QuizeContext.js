"use client"
const { createContext, useState, useEffect } = require("react");
import { easyQuestion } from '../easyQuestions'
import { hardQuestions } from '../hardQuestions';

export const QuizeContext = createContext();

const QuizeContextProvider = ({ children }) => {
    const [IsLoading, setIsLoading] = useState(true);
    const [questNo, setQuestNo] = useState(0);
    const [currentQuestion, setQurrentQuestion] = useState();
    const [isWrong, setIsWrong] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [time, setTime] = useState(30);
    const [selected, setSelected] = useState(null);
    const [chances, setChances] = useState(3);
    const [score, setScore] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    let checkingDiff=localStorage.getItem("difficulty")
    const [questionsMethod,setQuestionsMethod]=useState(checkingDiff==="easy" ? easyQuestion : hardQuestions);

    const nameSetting = (name, difficulty) => {
        localStorage.setItem("name", name);
        localStorage.setItem("difficulty", difficulty);
    }

    const gettingData = () => {
        // console.log("test",questionsMethod)
        const gettingCurrentData = questionsMethod[questNo];
        setQurrentQuestion(gettingCurrentData)
        setIsLoading(false);
    }

    const onRetry=(router)=>{
        localStorage.removeItem("difficulty")
        localStorage.removeItem("name");
        localStorage.removeItem("questionNo")
        router.push("/");
    }


    useEffect(() => {
        gettingData()
    }, [questNo])

    const nextQuestion = () => {
        setQuestNo((prev) => prev + 1);
        setTime(30);
        setSelected(null);
        setShowAnswer(false);
    }

    const checkingAnswer = async (id, ans) => {
        // console.log(id);
        let isCheck = questionsMethod[id]
        console.log("myansser",ans[0])
        console.log("checkAnswer",isCheck.answer)
        if (isCheck.answer == ans[0]) {
            setShowAnswer(true)
            setScore((prev) => prev + 5);
            setCorrectCount((prev) => prev + 1);
            console.log(questNo);
            setTime(30);
        }
        else {
            setIsWrong(true);
            setChances((prev) => prev - 1);
            setShowAnswer(true)
        }
    }

    const handleQuizeRet = async () => {
       localStorage.removeItem("name");
       localStorage.removeItem("difficulty");
       localStorage.setItem("questionNo",0)
       window.location.href = `/QuizePage`;
    }

    useEffect(() => {
        if (time === null) return null;
        if (time === 0) {
            nextQuestion();
            return;
        }
        const intervel = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000)
        return () => clearInterval(intervel);
    }, [time, questNo])

    useEffect(() => {
        localStorage.setItem("questionNo", questNo);
    }, [questNo])

    return (
        <QuizeContext.Provider value={{onRetry,setQuestionsMethod,handleQuizeRet, score, chances, nextQuestion, selected, setSelected, showAnswer, isWrong, time, checkingAnswer, questNo, IsLoading, nameSetting, gettingData, currentQuestion }}>
            {children}
        </QuizeContext.Provider>
    )
}

export default QuizeContextProvider
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../services/quizapi';
import AnimationButton from '../ui/AnimationButton';
import ConfirmModal from '../ui/ConfirmModal';
function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const TOTAL_TIME = 5 * 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const {category} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // useEffect(() => {
  //   api.get("/quiz/get/1")
  //   .then((res) => {
  //     console.log("Questions from backend:", res.data);
  //     console.log("Lenght:", res.data.length);
  //     setQuestions(res.data);
  //     setLoading(false)
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     setLoading(false);
  //   })
  // },[])

  
  useEffect(() => {
    if(!location.state?.fromCategory){
      navigate("/categories", {replace: true});
    }

    const blockBack = () => {
      navigate("/categories", {replace: true});
    }

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", blockBack);

    return () => window.removeEventListener("popstate", blockBack);
  }, [])


  useEffect(() => {
    if(!category) return;
    api.get(`/quiz/category/${category}`)
       .then(res =>{
        console.log("Category questions:", res.data);
        setQuestions(res.data);
        setLoading(false);
       })
       .catch(err =>{
        console.error(err);
        setLoading(false);
       });
  }, [category])

  useEffect(() => {
   if(timeLeft <= 0){
    submitQuiz();
    return;
   }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev  - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);
  
  function formatTime(seconds){
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  if(loading){
    return <div>Loading...</div>;
  }

  


  if(questions.length === 0){
    return <div>No questions found</div>
  }

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id];



  function handleClick(){

    const currentQuestionsId = questions[currentIndex].id;

    if(!answers[currentQuestionsId]){
      alert("Please Select an answer");
      return;
    }

    if(currentIndex < questions.length-1){
    setCurrentIndex(prev => prev + 1);
    }
    else{
      const unanswered = questions.filter(q => !answers[q.id]);

      if(unanswered.length > 0){
        setShowConfirm(true);
      } else {
        submitQuiz();
      }
    }
  }

  function handleAnswerSelect(questionId, option){
    setAnswers((prevAnswers) =>{
      return {
        ...prevAnswers,
        [questionId] : option
      }
    })
  }

  // useEffect(() => {
  //   console.log(answers);
  // }, [answers])


  function submitQuiz() {

    console.log("Submit Quiz called");
    
    let correct = 0;

    questions.forEach((q) => {
      const userLetter = answers[q.id];
      let userText = null;

      if(userLetter === "A") userText = q.option1;
      if(userLetter === "B") userText = q.option2;
      if(userLetter === "C") userText = q.option3;
      if(userLetter === "D") userText = q.option4;

      if(userText === q.rightAnswer){
        correct++;
      }
    })

     navigate("/result", {
      state: {
      score: correct,
      total: questions.length,
      questions,
      answers
    },
    replace: true
  });

    console.log( "Final score:", correct);


    // console.log("Submitting payload:", responseList);
  }


  // function handleRetry(){
  //   localStorage.removeItem("quizCompleted");
  //   localStorage.removeItem("quizScore");

  //   setCurrentIndex(0);
  //   setAnswers({});
  //   setScore(null);
  //   setShowResult(false);
  //   setTimeLeft(TOTAL_TIME)
  // }


  function handlePrevious(){
     if(currentIndex > 0){
      setCurrentIndex(prev => prev - 1);
     }
  }


  return (
     <div className='min-h-screen bg-linear-to-br from-[#1b1f3b] to-[#3b3f8c]
                     flex items-center justify-center px-4'>
      <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
       className='w-full max-w-xl bg-[#0f1229] rounded-2xl shadow-2xl p-8'>

         <div className='flex justify-between items-center mb-4 text-sm'>
           <span className='text-gray-300 font-semibold'>
             {category?.toUpperCase}
           </span>

           <span className={`font-semibold
            ${timeLeft <=60 ? "text-red-400" : "text-green-400"}`}>
            ⏱ {formatTime(timeLeft)}
           </span>
         </div>

         <div className='flex flex-wrap justify-center gap-2 mb-6'>
             {questions.map((q, index) => {
              const isAnswerd = answers[q.id];
              const isCurrent = index === currentIndex;

              return (
                 <button
                 key={q.id}
                 onClick={() => setCurrentIndex(index)}
                 className={`w-9 h-9 rounded-full text-sm font-semibold transition-all
                 ${
                  isCurrent ? "bg-blue-500 text-white scale-110"
                            : isAnswerd 
                            ? "bg-green-500 text-black hover:scale-150"
                            : "bg-gray-700 text-gray-300 hover:text-gray-600"
                 }`}>

                  {index + 1}
                 </button>
              )
             })}
         </div>

         <p className='text-center text-gray-400 text-sm mb-6'>
          Question {currentIndex + 1} / {questions.length}
         </p>

         <AnimatePresence mode="wait">
           <motion.div
           key={currentQuestion.id}
           initial={{ opacity: 0, x: 40}}
           animate={{ opacity: 1, x: 0}}
           exit={{ opacity: 0, x: -40}}
           transition={{duration: 0.25}}
           className='bg-[#1b1f3b] p-6 rounded-xl mb-6'
           >
             <h2 className='text-lg font-semibold text-white text-center'>
              {currentQuestion.questionTitle}
             </h2>
           </motion.div>
         </AnimatePresence>
    
         <div className='space-y-3'>
           {[
             { label: "A", value: currentQuestion.option1},
             { label: "B", value: currentQuestion.option2},
             { label: "C", value: currentQuestion.option3},
             { label: "D", value: currentQuestion.option4},
           ].map(opt => {
            const isSelected = selectedAnswer === opt.label;

            return (
              <AnimationButton
                key={opt.label}
                onClick={() => handleAnswerSelect(currentQuestion.id, opt.label)
                }
                className={`w-full text-left px-4 py-3 rounded-lg border
                transition-all duration-200
                ${isSelected ? "bg-blue-600 text-white scale-[1.02"
                  : "bg-[#0f1229] border-[#252a5a] text-gray-200 hover:bg-[#252a5a]"}
                `}>
                    <span className='font-bold mr-2'>{opt.label}.</span>
                    {opt.value}
                </AnimationButton>


            )
           })}
         </div>

         <div className='mt-8 flex gap-4'>

             <AnimationButton
             onClick={handlePrevious}
             disabled={currentIndex === 0}
             className={`w-1/2 py-3 rounded-xl font-semibold transition-all
             ${
              currentIndex === 0 ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                 : "bg-blue-500 hover:bg-blue-600 text-white"
             }`}>
                Previous
             </AnimationButton>

             <AnimationButton
             onClick={handleClick}
             disabled={!answers[currentQuestion.id]}
             className={`w-1/2 py-3 rounded-xl font-semibold transition-all
             ${
              selectedAnswer ? "bg-green-500 hover:bg-green-600 text-black"
                             : "bg-gray-600 text-gray-400 cursor-not-allowed"
                                 
             }`}>
                {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
             </AnimationButton>
           
             
         </div>
         
      </motion.div>

      <ConfirmModal
         isOpen={showConfirm}
         title="Submit Quiz?"
         message={`You have ${
         questions.filter(q => !answers[q.id]).length
         } unanswered questions.`}
         onCancel={() => setShowConfirm(false)}
         onConfirm={() => {
         setShowConfirm(false);
         submitQuiz();
         }}
         />

     </div>
  )
}

export default Quiz
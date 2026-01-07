import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom';
import AnimationButton from '../ui/AnimationButton';
function AnswerReview() {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(!location.state){
      navigate("/", {replace: true})
    }
  }, [location, navigate])

  const {score, total, questions, answers} = location.state || {};

  if(score === undefined || total === undefined || !questions || !answers){
    return(
      <div className='text-white text-center mt-10'>
        No review data available
      </div>
    )
  }

    const getOptionText = (q, letter) => {
        if(!letter) return null;
        switch (letter) {
            case "A": return q.option1;
            case "B": return q.option2;
            case "C": return q.option3;
            case "D": return q.option4;
            default:
                return null;
        }

    }


    const goBack = () => {
      navigate("/result", {
        state: location.state,
        replace: true
      })
    }
    

  return (
     <div className='min-h-screen bg-linear-to-br from-[#1b1f3b] to-[#3b3f8c]
                      flex items-center justify-center px-4'>

      <div className='w-full max-w-3xl bg-[#0f1229] rounded-2xl shadow-2xl p-8'>

        <h1 className='text-3xl font-bold text-white text-center mb-8'>
          Answer Review
        </h1>

        <div className='space-y-6'>
          {questions.map((q, index) => {
            const userLetter = answers[q.id];
            const userText = getOptionText(q, userLetter);
            const correctText = q.rightAnswer;

            return (
               <div key={q.id} className='bg-[#1b1f3b] p-5 rounded-xl'>

                <p className='font-semibold text-white mb-4'>
                  {index + 1}. {q.questionTitle}
                </p>

                {["A", "B", "C", "D"].map(letter => {
                  const optionText = getOptionText(q, letter);

                  const isCorrect = optionText === correctText;
                  const isUserWrong = optionText === userText && userText !== correctText;


                  return (
                    <div
                      key={letter}
                      className={`px-4 py-2 rounded-lg mb-2 text-sm flex justify-between items-center
                      ${
                        isCorrect ? "bg-green-600 text-white"
                                  : isUserWrong
                                  ? "bg-red-600 text-gray-300"
                                  : "bg-[#0f1229] text-gray-300"
                      }`
                      }
                    >
                      <span>
                        <span className='font-semibold mr-2'>{letter}.</span>
                        {optionText}
                      </span>

                      {isCorrect && (
                        <span className='text-xs font-bold'>Correct</span>
                      )}
                      {isUserWrong && (
                        <span className='text-xs font-bold'>Your Answer</span>
                      )}
                    </div>
                  )
                })}
               </div>
            )
          })}
        </div>

        <AnimationButton
          onClick={goBack}
          className='mt-10 w-full bg-blue-500 hover:bg-blue-600
                     py-3 rounded-xl font-semibold text-white
                     transition-all hover:scale-[1.02]'>
          Back to Result
        </AnimationButton>
      </div>
     </div>
  )
}

export default AnswerReview
import { useEffect } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import AnimationButton from "../ui/AnimationButton";
 function getPerformance(score, total) {
  const percent = Math.round((score / total) * 100);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(!location.state){
      navigate("/", {replace:true});
    }

    const blockBack = () => {
      navigate("/", {replace: true});
    }

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", blockBack);

    return () => window.removeEventListener("popstate", blockBack);
  }, [])

  if (percent >= 80)
    return {
      text: "Excellent 🎉",
      textColor: "text-green-400",
      borderColor: "border-green-400",
    };

  if (percent >= 50)
    return {
      text: "Good 👍",
      textColor: "text-yellow-400",
      borderColor: "border-yellow-400",
    };

  return {
    text: "Needs Improvement 💪",
    textColor: "text-red-400",
    borderColor: "border-red-400",
  };
}




function ResultScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const {score, total, questions, answers} = location.state || {};

  console.log("Result State:", location.state);
  

  useEffect(() => {
    if(!location.state){
      navigate("/", {replace: true})
    }
  }, [location, navigate])
  
  const percentage = Math.round((score / total) * 100);
  const performance = getPerformance(score, total);

  const handleRetry = () => {
   navigate("/categories", {replace: true});
  }

  const handleReview = () => {
    navigate("/review", {
      state: {score, total, questions, answers}, replace: true
  })
  }

  return (
     <div className="min-h-screen bg-linear-to-br [#1b1f3b] to-[#3b3f8c]
                     flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#0f1229] rounded-2xl p-8 text-center">

        <h1 className="text-3xl font-bold text-white mb-2">
           Quiz Completed 🎯
        </h1>

        <p className={`text-xl font-semibold mb-6 ${performance.textColor}`}>
          {performance.text}
        </p>

        <div className="flex justify-center mb-6">
          <div className={`w-36 h-36 rounded-full border-4
            ${performance.borderColor}
            flex flex-col items-center justify-center`}
          >
            <span className="text-4xl font-bold text-white">
              {score}/{total}
            </span>
            <span className="text-sm text-gray-400 mt-1">
              Score
            </span>
          </div>
        </div>

        <p className="text-gray-300 mb-8">
          You scored <span className="font-bold">{percentage}%</span>
        </p>

        <div className="space-y-4">
          <AnimationButton
            onClick={handleReview}
            className="w-full bg-green-500 hover:bg-green-600
                       text-black py-3 rounded-xl font-semibold
                       transition-all hover:scale-[1.02]"
          >
            Review Answers
          </AnimationButton>

          <AnimationButton
            onClick={handleRetry}
            className="w-full bg-blue-500 hover:bg-blue-600
                       text-white py-3 rounded-xl font-semibold
                       transition-all hover:scale-[1.02]">
            Retry Quiz
          </AnimationButton>
        </div>
      </div>
     </div>
  );
}

export default ResultScreen;

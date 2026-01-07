import React, { useEffect, useState } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'
function Category() {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if(location.key !== "default"){
  //     navigate("/", {replace: true})
  //   }
  // }, [])

  useEffect(() => {

    // if(!location.state?.fromSplash){
    //   navigate("/", {replace: true})
    // }

    const blockNavigation = () => {
      navigate("/", {replace: true});
    }

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", blockNavigation);

    return () => window.removeEventListener("popstate", blockNavigation);
  }, [])

  const categories = [
    {name: "Java", value: "java", icon: "☕" },
    {name: "Python", value: "python", icon: "🐍" },
    {name: "JavaScript", value: "javaScript", icon: "⚡" },
    { name: "SQL", value: "sql", icon: "🗄️" },
    { name: "Spring Boot", value: "spring", icon: "🌱" },
  ]


  return (
    <div className='min-h-screen bg-linear-to-br from-[#1b1f3b] to-[#3b3f8c] flex items-center justify-center px-4'>

      <div className='bg-[#0f1229] p-8 rounded-2xl w-full max-w-3xl lg:max-w-5xl  shadow-2xl'>

        <h1 className='text-2xl font-bold text-white text-center'>
           Choose Category
        </h1>

        <p className='text-gray-400 text-sm text-center mt-2'>
          Select a topic to start the quiz
        </p>

        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
           {categories.map((cat) => (
            <div
            key={cat.value}
            onClick={() => navigate(`/quiz/${cat.value}`, {replace: true, state:{fromCategory: true}})}
            className='flex items-center gap-4 p-6 bg-[#1b1f3b]
            rounded-xl cursor-pointer
            hover:bg-[#252a5a]
            transition-all duration-300
            hover:scale-[1.02]'
        >
              <div className='text-3xl'>{cat.icon}</div>
              <div className='text-white font-semibold'>{cat.name}</div>
            </div>
           ))}
        </div>
      </div>
    </div>
  )
}

export default Category
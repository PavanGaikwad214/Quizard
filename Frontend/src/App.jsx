import { useState } from 'react'
import Quiz from './components/Quiz'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnswerReview from './components/AnswerReview'
import ResultScreen from './components/ResultScreen'
import Splash from './Pages/Splash'
import Category from './Pages/Category'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path='/categories' element={<Category />} />
      <Route path="/quiz/:category" element={<Quiz />} />
      <Route path='/review' element={<AnswerReview />} />
      <Route path='/result' element={<ResultScreen />} />
    </Routes>
    </BrowserRouter>
        
  )
}

export default App

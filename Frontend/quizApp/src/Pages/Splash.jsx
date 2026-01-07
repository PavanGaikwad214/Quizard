import { useNavigate } from 'react-router-dom';
import img from "../Images/laptop_3130747.png";
import "../styles/Splash.css";
import AnimationButton from '../ui/AnimationButton';

function Splash() {
    const navigate = useNavigate();

  
    
  return (
    <div className='splash-container'>
      <div className='splash-card'>
         <img src={img} className='mx-auto w-24 mb-10' alt="Quiz" />
        <h1 className='app-title'>
            Quizard
        </h1>
        <p className='tagline'>
            Test your knowledge. Challenge yourself.
        </p>

        <AnimationButton
           className='start-btn'
           onClick={() => navigate("/categories", {replace: true})}
           >
            Start Playing
        </AnimationButton>
      </div>
    </div>
  )
}

export default Splash
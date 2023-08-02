import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"


const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1); // Navigate back to the previous route
    };
  return (
    <button onClick={goBack} className="flex items-center gap-1 mb-3 text-blue-400 ">
    <FaArrowLeft />
        Back
    </button>
  )
}

export default BackButton
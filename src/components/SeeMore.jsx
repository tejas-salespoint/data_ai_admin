import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

const SeeMore = ({label,link}) => {
  return (
    <Link to={link}>
     <button className="flex items-center gap-3 text-sm text-white hover:text-blue-400">{label || "See More"} <FaArrowRight />  </button>
    </Link>
   
  )
}

SeeMore.propTypes = {
    link : String ,
    label : String
}


export default SeeMore
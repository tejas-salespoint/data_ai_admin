import { FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"


// eslint-disable-next-line react/prop-types
const CreateButton = ({link}) => {
  return (
    <Link to={link} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
    <div className=" relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        <div className="flex gap-2 items-center">
        <FaPlus size={15}  />
        <span className="text-sm">
        Create
        </span>
        </div>
       
    </div>
  </Link>
  )
}

export default CreateButton
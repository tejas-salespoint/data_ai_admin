/* eslint-disable react/prop-types */

import { useState } from "react";


const ImageCard = ({ id, active, title, image, createdAt, onSelect }) => {
  const [isSelected, setIsSelected] = useState(active || false);
  const [deleteDialog, setDeleteDialog] = useState({});
  const handleImageClick = () => {
    setIsSelected(true); // Select the clicked image
    if (onSelect) {
      onSelect(); // Notify the parent component about the selection change
    }
  };

  // const handleDeleteImage = ({id}) => {
  //   console.log(id)
  // }

  return (
    <div
      onClick={() => handleImageClick}
      className={`max-w-sm  ${
        id == active ? "border-blue-600 border-[0.2rem]" : ""
      }    rounded-lg shadow dark:bg-gray-800 `}
    >
      <div className="flex items-center justify-center relative ">
        <img
          onClick={handleImageClick}
          className={`rounded-lg object-scale-down h-40 bg-transparent  `}
          src={image}
          alt=""
        />
        {/* <div aria-label="delete" className="bg-gray-600  p-2 rounded-full absolute top-3 right-3 hover:bg-red-600">
          <MdDelete
            onClick={handleDeleteImage(id)}
            color="white"
          />
        </div> */}
        {/* {deleteDialog && <DeleteImage />} */}
        
      </div>
    </div>
  );
};
export default ImageCard;

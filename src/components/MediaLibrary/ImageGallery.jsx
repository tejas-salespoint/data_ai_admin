/* eslint-disable react/prop-types */
import ImageCard from "./ImageCard";
import { useQuery } from "@apollo/client";
import { GET_MEDIA_LIBRARY_QUERY } from "../../../graphql/query/queries";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";

const ImageGallery = ({ setImageId, imageId }) => {
  const { data, loading, error } = useQuery(GET_MEDIA_LIBRARY_QUERY);
  const [selectedImageId, setSelectedImageId] = useState(imageId?.id);

  const handleImageSelect = (imageId, imageUrl) => {
    setSelectedImageId(imageId); // Select the clicked image
    setImageId({
      url: imageUrl,
      id: imageId,
    });
  };

  useEffect(() => {
    console.log(selectedImageId);
  }, [selectedImageId]);

  if (loading)
    return (
      <>
        <div className="flex justify-center items-center m-24">
          <Spinner color="blue" className="h-10 w-10" />
        </div>
      </>
    );

  return (
    <div
      className="grid grid-cols-4 p-3 gap-5 overflow-auto"
      style={{ maxHeight: "400px" }} // Adjust the max height as needed
    >
      {data?.uploadFiles?.data?.map((file) => (
        <ImageCard
          active={selectedImageId}
          id={file?.id}
          key={file?.id}
          title={file?.attributes?.name}
          createdAt={file?.attributes?.createdAt}
          image={file?.attributes?.url}
          onSelect={() => handleImageSelect(file?.id, file?.attributes?.url)}
        />
      ))}
    </div>
  );
};

export default ImageGallery;

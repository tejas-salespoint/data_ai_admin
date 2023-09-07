/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ImageCard from "./ImageCard";
import { useQuery } from "@apollo/client";
import { GET_MEDIA_LIBRARY_QUERY } from "../../../graphql/query/queries";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { Pagination } from "flowbite-react";

const ImageGallery = ({ setImageId, imageId }) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_MEDIA_LIBRARY_QUERY,
    {
      variables: {
        page: 1,
        pageSize: 12,
      },
    }
  );

  console.log(data)

  const [selectedImageId, setSelectedImageId] = useState(imageId?.id);
  const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage to 1

  const fetchPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const fetchNextPage = () => {
    if (currentPage < data?.uploadFiles?.meta?.pagination?.pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  const onPageChange = (page) => {
    // Update the current page and fetch data for the new page
    setCurrentPage(page);
    // fetchMore({
    //   variables: {
    //     page,
    //     pageSize: 12,
    //   },
    // });

    fetchMore({
      variables: {
        page, // Increment the page number
        pageSize: 12,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          uploadFiles: {
            ...prev.uploadFiles,
            data: [ ...fetchMoreResult.uploadFiles.data],
            meta: fetchMoreResult.uploadFiles.meta,
          },
        };
      },
    });
  };

  const handleImageSelect = (imageId, imageUrl) => {
    setSelectedImageId(imageId);
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

  if (error) {
    // Handle the error state here
    return <div>Error loading data</div>;
  }
  return (
    <>
      <div
        className="grid grid-cols-4 p-3 gap-5 overflow-auto"
        style={{ maxHeight: "400px" }}
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
      <div className=" flex justify-center items-start">
        {/* <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={data?.uploadFiles?.meta?.pageSize} // Calculate total pages
        /> */}

        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li  onClick={fetchPreviousPage}>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-500 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>

              </a>
            </li>

            {Array.from({length : data?.uploadFiles?.meta?.pagination?.pageCount}).map((item,index) => (
              <li key={index} onClick={() => onPageChange(index + 1)} >
                <a
               
                  className={`flex cursor-pointer items-center justify-center  px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${ index+1 == currentPage ? "dark:bg-gray-500" : "dark:bg-gray-800" }  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {index + 1}
                </a>
              </li>
            ))}

            <li  onClick={fetchNextPage}>
              <div
                
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-500 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ImageGallery;

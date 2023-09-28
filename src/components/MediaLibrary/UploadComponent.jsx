import { useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_MEDIA_LIBRARY_QUERY, UPLOAD_FILE } from "../../../graphql/query/queries";

const UploadComponent = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview URL

  const [uploadImage, { data, loading, error }] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      // Handle the response from the server after image upload if needed
    
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Generate a preview URL for the selected image
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleUpload = async () => {
    if (image) {
      try {
        await uploadImage({
          variables: { file: image },
          refetchQueries: [
            {
              query: GET_MEDIA_LIBRARY_QUERY, // Use 'query' instead of the incorrect 'GET_MEDIA_LIBRARY_QUERY'
              variables: {
                page: 1,
                pageSize: 12,
              },
            },
          ],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setImage(null);
        setImagePreview(null);
      }
    } else {
      alert("Please Select an Image ?")
    }
  };
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-row items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="flex flex-col items-center">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              onChange={handleImageChange}
              accept="image/*"
              id="dropzone-file"
              type="file"
              className="hidden"
            />
            <button
              disabled={loading}
              onClick={handleUpload}
              className={`relative ${loading && 'animate-pulse'} mt-5 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {loading ? (
                  <div className="px-3 py-1  font-medium leading-none text-center text-blue-800  rounded-full   dark:text-blue-200">
                    loading...
                  </div>
                ) : (
                  "Upload"
                )}
              </span>
            </button>
          </div>
          {/* image preview */}
          {imagePreview && (
            <div className="w-80 h-60 flex items-center ">
              <img
                srcSet={imagePreview}
                className={`rounded-lg object-scale-down w-80 h-40 bg-transparent `}
                alt="image description"
              />
            </div>
          )}
        </label>
      </div>
    </>
  );
};
export default UploadComponent;

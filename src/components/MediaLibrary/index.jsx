/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Card, Modal, Tabs } from "flowbite-react";
import ImageGallery from "./ImageGallery";
import UploadComponent from "./UploadComponent";
import MediaComponent from "./MediaComponent";

export default function ModelLibrary({ setImageId, imageid }) {
  const [openModal, setOpenModal] = useState(false);
  const [confirmImageId, setConfirmImageId] = useState({});
  const [active, setActive] = useState(true);
  function onClick() {
    setOpenModal((prev) => !prev);
  }

  function ImageConfirm() {
    setImageId({
      url: confirmImageId?.url,
      id: confirmImageId?.id,
    });
    onClick();
  }

  return (
    <>
      {/* Modal toggle */}
      {/* <button
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        onClick={onClick}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Image
      </button> */}

      <div
        className="flex items-center justify-center w-full sm:col-span-2 pattern-paper pattern-yellow-500 pattern-bg-white 
        pattern-size-16 pattern-opacity-20"
        onClick={onClick}
      >
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-row  items-center  gap-5 pt-5 pb-6">
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
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 flex justify-center flex-col">
              <span className="font-semibold">Click to Open Media Library</span>{" "}
              <span>or Upload and Select Image</span>
            </p>
           

            {/* Image */}

            {/* <img
              srcSet={imageid.url}
              className="w-full h-auto max-w-xl rounded-lg"
              alt="image description"
            /> */}
            {imageid?.url && (
              <img
                srcSet={imageid.url}
                className={`rounded-lg h-48 bg-transparent`}
                alt="image description"
              />
            )}
          </div>
        </label>
      </div>
      

      {/* Main modal */}
      {openModal && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className="relative w-full max-w-5xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Media Libarary
                </h3>
                <button
                onClick={onClick}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}

              <>
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                  <ul
                    className="flex flex-wrap -mb-px text-sm font-medium text-center"
                    id="myTab"
                    data-tabs-toggle="#myTabContent"
                    role="tablist"
                  >
                    <li className="mr-2" role="presentation">
                      <button
                        onClick={() => setActive((prev) => !prev)}
                        className={`inline-block p-4  rounded-t-lg  ${
                          active
                            ? " border-b-2 rounded-t-lg"
                            : " border-transparenthover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        }`}
                        id="profile-tab"
                        data-tabs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Upload
                      </button>
                    </li>
                    <li className="mr-2" role="presentation">
                      <button
                        onClick={() => setActive((prev) => !prev)}
                        className={` inline-block p-4  rounded-t-lg  ${
                          !active
                            ? " border-b-2 rounded-t-lg"
                            : " border-transparenthover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        }`}
                        id="dashboard-tab"
                        data-tabs-target="#dashboard"
                        type="button"
                        role="tab"
                        aria-controls="dashboard"
                        aria-selected="false"
                      >
                        Media
                      </button>
                    </li>
                  </ul>
                </div>

                {active ? (
                  <UploadComponent />
                ) : (
                  <MediaComponent
                    setImageId={setConfirmImageId}
                    imageId={confirmImageId}
                  />
                )}
              </>

              {/* Modal footer */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={ImageConfirm}
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {}
                  Confirm
                </button>
                <button
                  onClick={onClick}
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

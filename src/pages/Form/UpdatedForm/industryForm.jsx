import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_INDUSTRY,
  GET_INDUSTRIES,
} from "../../../../graphql/query/queries.js";

import Button from "../../../components/Button.jsx";
import { TextInput } from "../../../components/TextInput.jsx";
import BackButton from "../../../components/BackButton.jsx";
import { useNavigate } from "react-router-dom";
import { LinkInput } from "../../../components/LinkInput.jsx";
import MediaLibrary from "../../../components/MediaLibrary/index.jsx";
import MainTextEditor from "../../../components/TextEditor/MainTextEditor.jsx";
import DeleteDialog from "../../../components/DeleteDialog.jsx";

const IndustryForm = () => {
  const navigate = useNavigate();
  const [createIndustry, { loading }] = useMutation(CREATE_INDUSTRY);
  const [imageid, setImageId] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    overview: "",
    industryPillers: [],
  });

  const [imageBase64, setImageBase64] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, overview, link } = formData;
    const publishedAt = new Date().toISOString();

    try {
      await createIndustry({
        variables: {
          title,
          link,
          overview,
          publish: publishedAt,
          image: imageid?.id,
        },
        refetchQueries: [{ query: GET_INDUSTRIES }],
      });

      // Clear form fields on successful submission
      setFormData({
        title: "",
        link: "",
        overview: "",
        industryPillers: [],
      });
      setImageBase64({});
      setIsFormSubmitted(true);
      navigate("/industry");
      // Set form submission status to true
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  function handleClearClick() {
    setFormData({
      title: "",
      link: "",
      overview: "",
      industryPillers: [],
    });
  }

  return (
    <div className="m-3 mx-6 ">
      <BackButton />
    
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Create an Industry
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border rounded-2xl py-8 px-4 mx-auto max-w-3xl lg:py-16"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            value={formData.title}
            setValue={(value) =>
              setFormData((prevData) => ({ ...prevData, title: value }))
            }
            label="Name"
            name="name"
            placeholder="Type industry name"
            required
          />
          <LinkInput
            value={formData.title} // Use the same title for generating the slug
            setValue={(value) =>
              setFormData((prevData) => ({ ...prevData, link: value }))
            }
            label="Link"
            name="link"
            placeholder="Auto generate link"
            required
          />

          {/* <TextAreaInput
            value={formData.overview}
            setValue={(value) =>
              setFormData((prevData) => ({ ...prevData, overview: value }))
            }
            label="Overview"
            id="description"
            rows={8}
            placeholder="Your description here"
          /> */}

          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Overview
            </label>
            <MainTextEditor
              value={formData.overview}
              setValue={(value) =>
                setFormData((prevData) => ({ ...prevData, overview: value }))
              }
            />
          </div>

          {/* Media libaray */}

          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Image
            </label>
            <MediaLibrary setImageId={setImageId} imageid={imageid} />
          </div>

          {/* <p>Image id : {imageid.id } {imageid.url}</p> */}
          {/* <img src={imageid.url} alt="imageid"  /> */}
        </div>

        <div className="flex gap-3 justify-end items-center">
          <Button
            onClick={handleClearClick}
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-700 hover:bg-gray-700"
            label="Clear"
          />
          <Button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-700 hover:bg-gray-700"
            label="Create"
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default IndustryForm;

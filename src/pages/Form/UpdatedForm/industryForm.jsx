import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_INDUSTRY,
  GET_INDUSTRIES,
} from "../../../../graphql/query/queries.js";

import Button from "../../../components/Button.jsx";
import { TextInput } from "../../../components/TextInput.jsx";
import { TextAreaInput } from "../../../components/TextAreaInput.jsx";
import ImageUploader from "../../../components/FormFields/ImageUploader.jsx";
import BackButton from "../../../components/BackButton.jsx";
import { useNavigate } from "react-router-dom";
import { LinkInput } from "../../../components/LinkInput.jsx";

const IndustryForm = () => {
  const navigate = useNavigate();
  const [createIndustry, { loading }] = useMutation(CREATE_INDUSTRY);

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
          image: imageBase64,
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

          <TextAreaInput
            value={formData.overview}
            setValue={(value) =>
              setFormData((prevData) => ({ ...prevData, overview: value }))
            }
            label="Overview"
            id="description"
            rows={8}
            placeholder="Your description here"
          />
          <ImageUploader
            value={imageBase64}
            setValue={setImageBase64}
            label={"Image"}
            isFormSubmitted={isFormSubmitted} // Pass the form submission status as a prop
          />
        </div>

        <Button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-700 hover:bg-gray-700"
          label="Create"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default IndustryForm;

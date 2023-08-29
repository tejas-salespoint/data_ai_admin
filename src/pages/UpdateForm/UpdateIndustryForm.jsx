import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_INDUSTRIES,
  GET_INDUSTRY_BY_ID,
  UPDATE_INDUSTRY,
} from "../../../graphql/query/queries.js";

import Button from "../../components/Button.jsx";
import { TextInput } from "../../components/TextInput.jsx";

import { TextAreaInput } from "../../components/TextAreaInput.jsx";
import { useLocation } from "react-router-dom";
import ImageUploader from "../../components/FormFields/ImageUploader.jsx";
import BackButton from "../../components/BackButton.jsx";
import { LinkInput } from "../../components/LinkInput.jsx";

const UpdateIndustryForm = () => {
  const location = useLocation();
  const [getId] = useState(location?.state?.id);

  const [getUpdateIndustryData, { data: getUpdateIndustryDataFilter }] =
    useLazyQuery(GET_INDUSTRY_BY_ID, {
      variables: {
        id: getId,
      },
    });

  const [updateIndustry, { loading }] = useMutation(UPDATE_INDUSTRY);
  const [imageBase64, setImageBase64] = useState({});
  const [isFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    overview: "",
    industryPillers: [],
  });

  // Fetch industry data when the component mounts and id is available
  useEffect(() => {
    if (getId) {
      getUpdateIndustryData();
    }
  }, [getId, getUpdateIndustryData]);

  // Update the form data when industry data is available
  useEffect(() => {
    if (getUpdateIndustryDataFilter) {
      setFormData({
        title:
          getUpdateIndustryDataFilter?.industry?.data?.attributes?.title || "",
        overview:
          getUpdateIndustryDataFilter?.industry?.data?.attributes?.overview ||
          "",
        link:
          getUpdateIndustryDataFilter?.industry?.data?.attributes?.link || "",
        industryPillers: [],
      });
      setImageBase64(
        getUpdateIndustryDataFilter?.industry?.data?.attributes?.image?.image
      );
    }
  }, [getUpdateIndustryDataFilter]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, overview, link } = formData;
    try {
      const { data } = await updateIndustry({
        variables: {
          id: getId,
          title,
          link,
          overview,
          image: imageBase64,
        },
        refetchQueries: [{ query: GET_INDUSTRIES }],
      });

      
      // Clear form fields on successful submission
      setFormData({
        title: "",
        overview: "",
        link: "",
        industryPillers: [],
      });
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div className="m-3 mx-6">
      <BackButton />
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Update an Industry
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border rounded-2xl py-8 px-4 mx-auto max-w-3xl lg:py-16"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            value={formData.title || "Loading ..."}
            setValue={(value) => setFormData({ ...formData, title: value })}
            label="Industry Name"
            name="name"
            placeholder="Type industry name"
            required
          />
          <LinkInput
            mainValue={formData.link}
            value={formData.title || "Loading ..."} // Use the same title for generating the slug
            setValue={(value) =>
              setFormData((prevData) => ({ ...prevData, link: value }))
            }
            label="Link"
            name="link"
            placeholder="Auto generate link"
            required
          />
          {/* Update the industryPillers state based on selected options */}
          {/* <SelectInput
                        label="Industry Pillers"
                        id="category"
                        options={["TV/Monitors", "PC", "Gaming/Console", "Phones"]}
                        isMulti
                        value={formData.industryPillers}
                        setValue={(value) => setFormData({ ...formData, industryPillers: value })}
                    /> */}
          <TextAreaInput
            value={formData.overview || "Loading ..."}
            setValue={(value) => setFormData({ ...formData, overview: value })}
            label="Overview"
            id="description"
            rows={8}
            placeholder="Your description here"
          />
          <ImageUploader
            value={imageBase64}
            setValue={setImageBase64}
            label={"Industry Image"}
            isFormSubmitted={isFormSubmitted}
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

export default UpdateIndustryForm;

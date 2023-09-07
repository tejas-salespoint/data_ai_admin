import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_INDUSTRY_BY_ID,
  UPDATE_INDUSTRY,
} from "../../../graphql/query/queries.js";

import Button from "../../components/Button.jsx";
import { TextInput } from "../../components/TextInput.jsx";

import { useLocation } from "react-router-dom";

import BackButton from "../../components/BackButton.jsx";
import { LinkInput } from "../../components/LinkInput.jsx";
import MainTextEditor from "../../components/TextEditor/MainTextEditor.jsx";
import MediaLibrary from "../../components/MediaLibrary/index.jsx";

const UpdateIndustryForm = () => {
  const location = useLocation();
  const getId = location?.state?.id;

  const [imageid, setImageId] = useState({
    url: null,
    id: null,
  });

  const [primaryImageId, setPrimaryImageId] = useState({
    url: null,
    id: null,
  });
  const [secondImageId, setSecondImageId] = useState({
    url: null,
    id: null,
  });


  const [
    getUpdateIndustryData,
    { data: getUpdateIndustryDataFilter, refetch },
  ] = useLazyQuery(GET_INDUSTRY_BY_ID, {
    variables: {
      id: getId,
    },
  });

  const [updateIndustry, { loading }] = useMutation(UPDATE_INDUSTRY);
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
      const industryData = getUpdateIndustryDataFilter?.industry?.data?.attributes;

      setFormData({
        title: industryData?.title || "",
        overview: industryData?.overview || "",
        link: industryData?.link || "",
        industryPillers: [],
      });

      setImageId({
        url: industryData?.industry_image?.data?.attributes?.url,
        id: industryData?.industry_image?.data?.id,
      });

      setPrimaryImageId({
        url: industryData?.primary_icon?.data?.attributes?.url,
        id: industryData?.primary_icon?.data?.id,
      })

      setSecondImageId({
        url: industryData?.secondary_icon?.data?.attributes?.url,
        id: industryData?.secondary_icon?.data?.id,
      })
    }
  }, [getUpdateIndustryDataFilter]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, overview, link } = formData;
    try {
      await updateIndustry({
        variables: {
          id: getId,
          title,
          link,
          overview,
          image: imageid?.id,
          primary_icon : primaryImageId?.id,
          secondary_icon : secondImageId?.id
        },
      }).then(() => {
        // Clear form fields on successful submission
        setFormData({
          title: "",
          overview: "",
          link: "",
          industryPillers: [],
        });

       refetch({
          variables: {
            id: getId,
          },
        })
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
            value={formData.title}
            setValue={(value) => setFormData({ ...formData, title: value })}
            label="Industry Name"
            name="name"
            placeholder="Type industry name"
            required
          />
          <LinkInput
            mainValue={formData.link}
            value={formData.title} // Use the same title for generating the slug
            setValue={(value) =>
              setFormData((prevData) => ({ ...prevData, link: value }))
            }
            label="Link"
            name="link"
            placeholder="Auto generate link"
            required
          />
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Overview
            </label>
            <MainTextEditor
              value={formData?.overview}
              setValue={(value) =>
                setFormData({ ...formData, overview: value })
              }
            />
          </div>


          <div className="flex gap-5">
            <div className="sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full">
                Primary Icon
              </label>
              <MediaLibrary
                setImageId={setPrimaryImageId}
                imageid={primaryImageId}
                type={true}
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Secondary Icon
              </label>
              <MediaLibrary
                setImageId={setSecondImageId}
                imageid={secondImageId}
                type={true}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Image
            </label>
            <MediaLibrary setImageId={setImageId} imageid={imageid} />
          </div>
        </div>
        <Button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-700 hover:bg-gray-700"
          label={loading ? "Updating..." : "Update"}
          loading={loading}
        />
      </form>
    </div>
  );
};

export default UpdateIndustryForm;

import { useEffect, useState, useMemo } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GET_INDUSTRIES,
  GET_INDUSTRY_PILLER_BY_ID,
  UPDATE_INDUSTRY_PILLER,
} from "../../../graphql/query/queries.js";
import Button from "../../components/Button.jsx";
import { TextInput } from "../../components/TextInput.jsx";
import { SelectInput } from "../../components/SelectInput.jsx";

import BackButton from "../../components/BackButton.jsx";
import { useLocation } from "react-router-dom";
import MainTextEditor from "../../components/TextEditor/MainTextEditor.jsx";

const UpdateIndustryPillerForm = () => {
  const location = useLocation();
  const getId = location?.state?.id;
  const [updateActive,setUpdateActive] = useState(true);

  const [
    getUpdateIndustryPillerData,
    {
      data: getUpdateIndustryPillerDataFilter,
      refetch: refetchIndustryPillers,
      loading
    },
  ] = useLazyQuery(GET_INDUSTRY_PILLER_BY_ID, {
    variables: {
      id: getId,
    },
  });

  const {
    loading: industriesLoading,
    data: industriesData,
    refetch: refetchIndustries,
  } = useQuery(GET_INDUSTRIES);

  const options = useMemo(() => {
    return (
      industriesData?.industries?.data?.map((item) => ({
        value: item.id,
        label: item.attributes.title,
      })) || []
    );
  }, [industriesData]);

  const [updateIndustryPiller, { loading: mutationLoading }] = useMutation(
    UPDATE_INDUSTRY_PILLER,
    {
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    industryId: null,
    link: "",
  });

  useEffect(() => {
    if (getId) {
      getUpdateIndustryPillerData();
    }
  }, [getId, getUpdateIndustryPillerData]);

  useEffect(() => {
    if (getUpdateIndustryPillerDataFilter) {
      setFormData({
        title:
          getUpdateIndustryPillerDataFilter?.industryPiller?.data?.attributes
            ?.title || "",
        overview:
          getUpdateIndustryPillerDataFilter?.industryPiller?.data?.attributes
            ?.overview || "",
        industryId:
          getUpdateIndustryPillerDataFilter?.industryPiller?.data?.attributes
            ?.industry?.data?.id,
        link:
          getUpdateIndustryPillerDataFilter?.industryPiller?.data?.attributes
            ?.overview_link || "",
      });
      setUpdateActive(false)
    }
  }, [getUpdateIndustryPillerDataFilter,getUpdateIndustryPillerData]);


  // check data is changed or not according to that we have option to disable or enable button
  useEffect(() => {
    console.log("formData changed:", formData); // Debugging line
    setUpdateActive(true);
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, overview, industryId, link } = formData;
    const publishedAt = new Date().toISOString();

    try {
      const { data } = await updateIndustryPiller({
        variables: {
          id: getId,
          title,
          overview,
          industry_id: industryId,
          learn_more_link: link,
          publish: publishedAt,
        },
      });

      

      // Clear form fields on successful submission
      setFormData({
        title: "",
        overview: "",
        industryId: null,
        link: "",
      });

      // Refresh the industry data after successful submission
      refetchIndustryPillers();
      refetchIndustries();
    } catch (error) {
      console.error(error);
    }
  };

  if (industriesLoading) return "Loading...";
  return (
    <div className="m-3 mx-6">
      <BackButton />
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Update an Industry Piller
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border rounded-2xl py-8 px-4 mx-auto max-w-3xl lg:py-16"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Title"
            value={formData.title || "Loading ..."}
            setValue={(value) => setFormData({ ...formData, title: value })}
            size={1}
            name="name"
            placeholder="Type industry name"
            required
          />
          <SelectInput
            value={formData.industryId || "Loading ..."}
            setValue={(value) =>
              setFormData({ ...formData, industryId: value })
            }
            label="Industry"
            size={1}
            id="category"
            form_link={'/create/industry'}
            options={options}
          />

          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Overview
            </label>
            <MainTextEditor
              value={formData.overview || "Loading ..."}
              setValue={(value) =>
                setFormData({ ...formData, overview: value })
              }
            />
          </div>

          <TextInput
            value={formData.link || "Loading ..."}
            setValue={(value) => setFormData({ ...formData, link: value })}
            label="Learn More Link"
            name="Learn More Link"
            placeholder="Type a link"
          />
        </div>
        <Button
          type="submit"
          
          className="inline-flex items-center  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-700 hover:bg-gray-700"
          label="Create"
          activeUpdate={updateActive}
          loading={mutationLoading}
        />
      </form>
    </div>
  );
};

export default UpdateIndustryPillerForm;

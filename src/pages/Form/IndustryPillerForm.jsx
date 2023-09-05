import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_INDUSTRY_PILLER,
  GET_INDUSTRIES,
} from "../../../graphql/query/queries.js";

import Button from "../../components/Button.jsx";
import { TextInput } from "../../components/TextInput.jsx";
import { SelectInput } from "../../components/SelectInput.jsx";
import { TextAreaInput } from "../../components/TextAreaInput.jsx";
import BackButton from "../../components/BackButton.jsx";
import { useNavigate } from "react-router-dom";
import MainTextEditor from "../../components/TextEditor/MainTextEditor.jsx";

const SolutionPlaysForm = () => {
  const navigate = useNavigate();
  const { loading: industriesLoading, data: industriesData } =
    useQuery(GET_INDUSTRIES);

  const industries = industriesData?.industries?.data || [];
  const options = industries.map((item) => ({
    value: item.id,
    label: item.attributes.title,
  }));

  const [createIndustryPiller, { loading: mutationLoading }] = useMutation(
    CREATE_INDUSTRY_PILLER
  );

  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    industryId: null,
    link: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, overview, industryId, link } = formData;
    const publishedAt = new Date().toISOString();

    try {
      const { data } = await createIndustryPiller({
        variables: {
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
      navigate("/industry_piller");
    } catch (error) {
      console.error(error);
    }
  };

  if (industriesLoading) return "Loading...";

  return (
    <div className="m-3 mx-6 ">
      <BackButton />
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Create an Industry Piller
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border rounded-2xl py-8 px-4 mx-auto max-w-3xl lg:py-16"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Title"
            value={formData.title}
            setValue={(value) => setFormData({ ...formData, title: value })}
            size={1}
            name="name"
            placeholder="Type industry name"
            required
          />
          <SelectInput
            value={formData.industryId}
            setValue={(value) =>
              setFormData({ ...formData, industryId: value })
            }
            label="Industry"
            size={1}
            form_link={"/create/industry"}
            id="category"
            options={options}
          />

          {/* <TextAreaInput
                        value={formData.overview}
                        setValue={(value) => setFormData({ ...formData, overview: value })}
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
                setFormData({ ...formData, overview: value })
              }
            />
          </div>
          <TextInput
            value={formData.link}
            setValue={(value) => setFormData({ ...formData, link: value })}
            label="Learn More Link"
            name="Learn More Link"
            placeholder="Type a link"
          />
        </div>
        <Button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-700 hover:bg-gray-700"
          label="Create"
          loading={mutationLoading}
        />
      </form>
    </div>
  );
};

export default SolutionPlaysForm;

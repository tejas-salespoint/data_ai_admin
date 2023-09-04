import { SelectInput } from "../../components/SelectInput.jsx";
import { TextInput } from "../../components/TextInput.jsx";
import DynamicInputFields from "../../components/FormFields/DynamicInputFields.jsx";
import Button from "../../components/Button.jsx";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GET_INDSUTRIES_PILLERS,
  GET_INDUSTRY_USECASES_FULL_BY_ID,
  UPDATE_INDUSTRY_USECASES,
} from "../../../graphql/query/queries.js";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton.jsx";
import { useLocation } from "react-router-dom";
import ImageUploader from "../../components/FormFields/ImageUploader.jsx";

const UpdateIndustryUseCasesForm = () => {
  const location = useLocation();
  const getId = location?.state?.id;

  const [
    getUpdateIndustryUseCaseData,
    { data: getUpdateIndustryUseCaseDataFilter, loading: dataLoading },
  ] = useLazyQuery(GET_INDUSTRY_USECASES_FULL_BY_ID, {
    variables: {
      id: getId,
    },
  });

  const [imageBase64, setImageBase64] = useState({});
  const [isFormSubmitted] = useState(false);

  const [createIndustryUseCase] = useMutation(UPDATE_INDUSTRY_USECASES);
  const { data: indsutryPillerData } = useQuery(GET_INDSUTRIES_PILLERS);

  const industries = indsutryPillerData?.industryPillers?.data || [];

  const options = industries.map((item) => ({
    value: item?.id,
    label: `${item?.attributes?.title} ( ${item?.attributes?.industry?.data?.attributes?.title} )`,
  }));

  const [formData, setFormData] = useState({
    usecaseTitle: "",
    industryPillarId: null,
    decisionMakers: [],
    decisionMakersFactors: [],
    desiredBusinessObjectives: [],
    customerPainPoints: [],
    proposedTechnicalSolution: [],
    otherNotableAttributes: [],
    products: [],
    industryName: "",
    geography: "",
    marketCap: "",
    employees: "",
    budget: "",
    imageLink: "",
    imageSubtitle: "",
  });

  useEffect(() => {
    if (getId) {
      getUpdateIndustryUseCaseData();
    }
  }, [getId, getUpdateIndustryUseCaseData]);
console.log(getUpdateIndustryUseCaseDataFilter)
  useEffect(() => {
    if (getUpdateIndustryUseCaseDataFilter) {
      setFormData({
        ...formData,
        usecaseTitle:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.title || "",
        industryPillarId:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.industry_piller.data?.id || null,
        decisionMakers:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.key_highlights?.decision_makers || [],
        decisionMakersFactors:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.key_highlights?.decision_making_factors || [],
        desiredBusinessObjectives:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.key_highlights?.desired_business_objectives || [],
        customerPainPoints:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.key_highlights?.customer_pain_points || [],
        proposedTechnicalSolution:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.key_highlights?.proposed_technical_solution || [],
        otherNotableAttributes:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.key_highlights?.other_notable_attributes || [],
        products:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.key_highlights?.products || [],
        industryName:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.ideal_customer_profile?.industries || "",
        geography:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.ideal_customer_profile?.geography || "",
        marketCap:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.ideal_customer_profile?.market_cap || "",
        employees:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.ideal_customer_profile?.employees || "",
        budget:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.ideal_customer_profile?.budget || "",
        imageLink:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.ideal_customer_profile?.image_link || "",
        imageSubtitle:
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.ideal_customer_profile?.image_subtitle || "",
      }),
        setImageBase64(
          getUpdateIndustryUseCaseDataFilter?.usecase?.data?.attributes
            ?.ideal_customer_profile?.image?.image || {}
        );
    }
  }, [getUpdateIndustryUseCaseDataFilter]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      usecaseTitle,
      industryPillarId,
      decisionMakers,
      decisionMakersFactors,
      desiredBusinessObjectives,
      customerPainPoints,
      proposedTechnicalSolution,
      otherNotableAttributes,
      products,
      industryName,
      geography,
      marketCap,
      employees,
      budget,
      imageLink,
      imageSubtitle,
    } = formData;

    const publishedAt = new Date().toISOString();

    try {
      const { data } = await createIndustryUseCase({
        variables: {
          id: getId,
          usecaseTitle,
          industryPillarId,
          decisionMakers,
          decisionMakersFactors,
          desiredBusinessObjectives,
          customerPainPoints,
          proposedTechnicalSolution,
          otherNotableAttributes,
          products,
          industryName,
          geography,
          marketCap,
          employees,
          budget,
          imageLink,
          imageSubtitle,
          publish: publishedAt,
        },
      });

      console.log(data);

      setFormData({
        usecaseTitle: "",
        industryPillarId: null,
        decisionMakers: [],
        decisionMakersFactors: [],
        desiredBusinessObjectives: [],
        customerPainPoints: [],
        proposedTechnicalSolution: [],
        otherNotableAttributes: [],
        products: [],
        industryName: "",
        geography: "",
        marketCap: "",
        employees: "",
        budget: "",
        imageLink: "",
        imageSubtitle: "",
      });
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="m-3 mx-6">
      <BackButton />
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Create an Industry Use Cases
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border rounded-2xl py-8 px-4 mx-auto max-w-3xl lg:py-10"
      >
        <div className={"grid gap-4  sm:gap-6"}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* TextInput with value and setValue props */}
            <TextInput
              label="Usecase title"
              name="usecaseTitle"
              placeholder="Type usecase title"
              size={1}
              value={formData.usecaseTitle}
              setValue={(value) =>
                setFormData({ ...formData, usecaseTitle: value })
              }
            />
            {/* SelectInput with value and setValue props */}
            <SelectInput
              label="Industry Pillar"
              size={1}
              id="category"
              value={formData.industryPillarId}
              setValue={(value) =>
                setFormData({ ...formData, industryPillarId: value })
              }
              options={options}
            />
          </div>

          <div>
            <label
              htmlFor={"keyHighlights"}
              className="block mb-4 text-sm text-blue-500 font-semibold dark:text-white"
            >
              Key Highlights
            </label>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 border rounded-2xl p-6">
              {/* Decision Makers */}
              <div>
                <DynamicInputFields
                  label={"Decision Makers"}
                  name={"decisionMakers"}
                  id={"decisionMakers"}
                  placeholder={"Enter names of decision makers..."}
                  value={formData.decisionMakers}
                  setValue={(value) =>
                    setFormData({ ...formData, decisionMakers: value })
                  }
                />
              </div>

              {/* Decision Makers Factors */}
              <div>
                <DynamicInputFields
                  label={"Decision Makers Factors"}
                  name={"decisionMakersFactors"}
                  id={"decisionMakersFactors"}
                  placeholder={"Enter factors influencing decision makers..."}
                  value={formData.decisionMakersFactors}
                  setValue={(value) =>
                    setFormData({ ...formData, decisionMakersFactors: value })
                  }
                />
              </div>

              {/* Desired Business Objectives */}
              <div>
                <DynamicInputFields
                  label={"Desired Business Objectives"}
                  name={"desiredBusinessObjectives"}
                  id={"desiredBusinessObjectives"}
                  placeholder={"Enter desired business objectives..."}
                  value={formData.desiredBusinessObjectives}
                  setValue={(value) =>
                    setFormData({
                      ...formData,
                      desiredBusinessObjectives: value,
                    })
                  }
                />
              </div>

              {/* Customer Pain Points */}
              <div>
                <DynamicInputFields
                  label={"Customer Pain Points"}
                  name={"customerPainPoints"}
                  id={"customerPainPoints"}
                  placeholder={"Enter customer pain points..."}
                  value={formData.customerPainPoints}
                  setValue={(value) =>
                    setFormData({ ...formData, customerPainPoints: value })
                  }
                />
              </div>

              {/* Proposed Technical Solution */}
              <div>
                <DynamicInputFields
                  label={"Proposed Technical Solution"}
                  name={"proposedTechnicalSolution"}
                  id={"proposedTechnicalSolution"}
                  placeholder={"Enter proposed technical solution..."}
                  value={formData.proposedTechnicalSolution}
                  setValue={(value) =>
                    setFormData({
                      ...formData,
                      proposedTechnicalSolution: value,
                    })
                  }
                />
              </div>

              {/* Other Notable Attributes */}
              <div>
                <DynamicInputFields
                  label={"Other Notable Attributes"}
                  name={"otherNotableAttributes"}
                  id={"otherNotableAttributes"}
                  placeholder={"Enter other notable attributes..."}
                  value={formData.otherNotableAttributes}
                  setValue={(value) =>
                    setFormData({ ...formData, otherNotableAttributes: value })
                  }
                />
              </div>

              {/* Products */}
              <div>
                <DynamicInputFields
                  label={"Products"}
                  name={"products"}
                  id={"products"}
                  placeholder={"Enter products..."}
                  value={formData.products}
                  setValue={(value) =>
                    setFormData({ ...formData, products: value })
                  }
                />
              </div>
            </div>
          </div>

          <div>
            {/* Ideal Customer profile */}
            <label
              htmlFor={"idealCustomerProfile"}
              className="block mb-4 text-sm text-blue-500 font-semibold dark:text-white"
            >
              Ideal Customer Profile
            </label>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 border rounded-2xl p-6">
              <TextInput
                label="Industry Name"
                name="industryName"
                placeholder="Enter Industry name..."
                size={1}
                value={formData.industryName}
                setValue={(value) =>
                  setFormData({ ...formData, industryName: value })
                }
              />
              <TextInput
                label="Geography"
                name="geography"
                placeholder="Enter Geographical region..."
                size={1}
                value={formData.geography}
                setValue={(value) =>
                  setFormData({ ...formData, geography: value })
                }
              />
              <TextInput
                label="Market Cap"
                name="marketCap"
                placeholder="Enter Market cap..."
                size={1}
                value={formData.marketCap}
                setValue={(value) =>
                  setFormData({ ...formData, marketCap: value })
                }
              />
              <TextInput
                label="Employees"
                name="employees"
                placeholder="Enter Number of employees..."
                size={1}
                value={formData.employees}
                setValue={(value) =>
                  setFormData({ ...formData, employees: value })
                }
              />
              <TextInput
                label="Budget"
                name="budget"
                placeholder="Enter Budget..."
                size={1}
                value={formData.budget}
                setValue={(value) =>
                  setFormData({ ...formData, budget: value })
                }
              />
            
            </div>
          </div>
          <div>
            {/* Ideal Customer profile */}
            <label
              htmlFor={"idealCustomerProfile"}
              className="block mb-4 text-sm text-blue-500 font-semibold dark:text-white"
            >
              Business Architecture Image
            </label>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 border rounded-2xl p-6">
              {/*  Upload Image */}
              <ImageUploader
                value={imageBase64}
                setValue={setImageBase64}
                label={"Business Architecture Image"}
                isFormSubmitted={isFormSubmitted} // Pass the form submission status as a prop
              />
              <TextInput
                label="Image Link"
                name="imageLink"
                placeholder="Enter Image URL..."
                size={1}
                value={formData.imageLink}
                setValue={(value) =>
                  setFormData({ ...formData, imageLink: value })
                }
              />
              <TextInput
                label="Image Subtitle"
                name="imageSubtitle"
                placeholder="Enter Image subtitle..."
                size={1}
                value={formData.imageSubtitle}
                setValue={(value) =>
                  setFormData({ ...formData, imageSubtitle: value })
                }
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-700 hover:bg-gray-700"
          label="Create"
          // loading={loading}
        />
      </form>
    </div>
  );
};

export default UpdateIndustryUseCasesForm;
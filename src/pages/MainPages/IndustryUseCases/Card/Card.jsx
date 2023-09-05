import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { GET_INDUSTRY_USECASE_BY_ID } from "../../../../../graphql/query/queries";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const IndustryUseCasesCard = ({ id }) => {
  const [getIndustryUseCaseData, { data, loading, error }] = useLazyQuery(
    GET_INDUSTRY_USECASE_BY_ID,
    {
      variables: {
        id: id,
      },
    }
  );

  useEffect(() => {
    getIndustryUseCaseData(); // Fetch the industry detail when the component mounts
  }, [getIndustryUseCaseData]);

  console.log(data);
  const item = data?.usecase?.data;
  console.log(item);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  if (error) return "Error :)";

  return (
    <div
      key={item?.id}
      className="group relative flex bg-cover bg-center bg-no-repeat items-center justify-center"
    >
      <div>
        <img
          className="h-30 w-50"
          src={
            item?.attributes?.image?.image ||
            "https://media.istockphoto.com/id/582256640/photo/oil-refinery-chemical-petrochemical-plant.jpg?s=612x612&w=0&k=20&c=BEdsHVe2vUfzRTb9KcsCS_tCH6_R_nKLKkOQCht8AKo="
          }
          alt="feature_1"
        />
      </div>

      <div>
        <div className="h-30 w-50 flex justify-center items-center backdrop-brightness-50 absolute z-10 inset-1 group-hover:hidden font-bold text-white">
          <button className="p-2 text-white text-sm bg-blue font-bold w-[48%] px-5 rounded-full">
            {item?.attributes?.title}
          </button>
        </div>

        <div className="absolute z-10 inset-1 flex justify-center items-center font-bold text-white">
          <div className="flex flex-col gap-3 justify-center items-center">
            <Link
              to={"/edit/industry_usecases/form"}
              state={{
                id: id,
              }}
            >
              <button className="p-2 text-sm flex items-center text hidden group-hover:block text-blue bg-white group-hover:text-black font-bold px-5 rounded-full">
                <FaEdit className="inline-block mr-2 text-lg" />
                Edit
              </button>
            </Link>
            <Link
              to={"/edit/industry_piller/form"}
              state={{
                id: id,
              }}
            >
              <button className="p-2 text-sm  items-center text hidden group-hover:block text-blue hover:bg-red-600 bg-white group-hover:text-black font-bold px-5 rounded-full">
                <MdDelete className="inline-block mr-2 text-lg" />
                Delete
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryUseCasesCard;

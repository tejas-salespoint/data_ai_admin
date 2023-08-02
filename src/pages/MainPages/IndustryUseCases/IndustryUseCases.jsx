import {  GET_INDUSTRY_USECASES } from "../../../../graphql/query/queries";
import { useQuery } from "@apollo/client";
import CreateButton from "../../../components/CreateButton";
import IndustryUseCasesCard from "./Card/Card";

const IndustryUseCases = () => {
  const { loading, error, data } = useQuery(GET_INDUSTRY_USECASES);

  if (loading) return "Loading...";
  if (error) return "Error";

  return (
    <>
      <div className="p-4 rounded-lg ">
            <div className='flex justify-between items-center mb-3'>
             <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Industry Use Cases</h2>
             <CreateButton link={'/create/industry_usecases'}  />
            </div>
            <div className="grid grid-cols-4  gap-6">
                {data?.usecases?.data?.map((item) => <IndustryUseCasesCard key={item?.id} id={item?.id} /> )}
            </div>
        </div>

    </>
  );
};

export default IndustryUseCases;

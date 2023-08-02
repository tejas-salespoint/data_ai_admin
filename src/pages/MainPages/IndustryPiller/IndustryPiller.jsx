import {  GET_INDUSTRY_PILLERS } from "../../../../graphql/query/queries";
import { useQuery } from "@apollo/client";
import CreateButton from "../../../components/CreateButton";
import IndustryPillerCard from "./Card/Card";

const IndustryPiller = () => {
  const { loading, error, data } = useQuery(GET_INDUSTRY_PILLERS);

  if (loading) return "Loading...";
  if (error) return "Error :)";

  return (
    <div className="p-4 rounded-lg ">
        <div className='flex justify-between items-center mb-3'>
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Industry Piller</h2>
          <CreateButton link={'/create/industry_piller'} />
        </div>
        <div className="grid grid-cols-4 gap-6">
            {data?.industryPillers?.data?.map((item) => <IndustryPillerCard key={item?.id} id={item?.id} /> )}
        </div>
    </div>
  );
};

export default IndustryPiller;

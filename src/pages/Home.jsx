import { useQuery } from "@apollo/client";
import {
  GET_INDUSTRIES,
  GET_INDUSTRY_PILLERS,
  GET_INDUSTRY_USECASES,
} from "../../graphql/query/queries.js";
import IndustryCard from "./MainPages/Industry/Card/Card.jsx";
import IndustryUseCasesCard from "./MainPages/IndustryUseCases/Card/Card.jsx";
import IndustryPillerCard from "./MainPages/IndustryPiller/Card/Card.jsx";
import SeeMore from "../components/SeeMore.jsx";
import FilterButton from "../components/FilterButton.jsx";
import { useState } from "react";

const Home = () => {
  const [sort, setSort] = useState({
    sorting: "id:desc",
    limit: 4,
  });
  const [pillerSort, setPillerSort] = useState({
    sorting: "id:desc",
    limit: 4,
  });
  const [usecaseSort, setUseCaseSort] = useState({
    sorting: "id:desc",
    limit: 4,
  });
  const industry = useQuery(GET_INDUSTRIES, {
    variables: {
      limit: sort?.limit,
      sort: [sort?.sorting],
    },
  });
  const piller = useQuery(GET_INDUSTRY_PILLERS, {
    variables: {
      limit: pillerSort?.limit,
      sort: [pillerSort?.sorting],
    },
  });
  const usecases = useQuery(GET_INDUSTRY_USECASES, {
    variables: {
      limit: usecaseSort?.limit,
      sort: [usecaseSort?.sorting],
    },
  });

  return (
    <>
      <div className="p-4 rounded-lg ">
        <div className="flex justify-between items-center mb-3">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Industry Landing
          </h2>
          <div className="flex gap-3 items-center">
            <FilterButton value={sort} setValue={setSort} />
            <SeeMore link={"/industry"} label={"See More"} />
          </div>
        </div>
        <div className="grid grid-cols-4  gap-6">
          {industry?.data?.industries?.data?.map((item) => (
            <IndustryCard key={item?.id} id={item?.id} />
          ))}
        </div>
      </div>

      <div className="p-4 rounded-lg ">
        <div className="flex justify-between items-center mb-3">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Industry Piller
          </h2>
          <div className="flex gap-3 items-center">
            <FilterButton value={pillerSort} setValue={setPillerSort} />
            <SeeMore link={"/industry_piller"} label={"See More"} />
          </div>
        </div>
        <div className="grid grid-cols-4  gap-6">
          {piller?.data?.industryPillers?.data?.map((item) => (
            <IndustryPillerCard key={item?.id} id={item?.id} />
          ))}
        </div>
      </div>

      <div className="p-4 rounded-lg ">
        <div className="flex justify-between items-center mb-3">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Industry Use Cases
          </h2>
          <div className="flex gap-3 items-center">
            <FilterButton value={usecaseSort} setValue={setUseCaseSort} />
            <SeeMore link={"/indsutry_use_cases"} label={"See More"} />
          </div>
        </div>
        <div className="grid grid-cols-4  gap-6">
          {usecases?.data?.usecases?.data?.map((item) => (
            <IndustryUseCasesCard key={item?.id} id={item?.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

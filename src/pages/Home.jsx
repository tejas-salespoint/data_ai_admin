import { useQuery } from "@apollo/client";
import { GET_INDUSTRIES } from "../../graphql/query/queries.js";
import { Link} from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const Home = () => {
    const { loading, error, data } = useQuery(GET_INDUSTRIES);

    if (loading) return "Loading...";
    if (error) return "Error";
    
    return (
        <>

        <div className="p-4 rounded-lg ">
             <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Industry Landing</h2>
            <div className="grid grid-cols-4  gap-6">
                {data?.industries?.data?.map((item) => (
                    <div
                        key={item?.title}
                        className="group relative flex bg-cover bg-center bg-no-repeat items-center justify-center "
                    >
                        <div>
                            <img
                                className="h-30 w-50"
                                src={item?.attributes?.image?.image ? item?.attributes?.image?.image :  'https://media.istockphoto.com/id/582256640/photo/oil-refinery-chemical-petrochemical-plant.jpg?s=612x612&w=0&k=20&c=BEdsHVe2vUfzRTb9KcsCS_tCH6_R_nKLKkOQCht8AKo='}
                                alt="feature_1"
                            />
                         
                        
                        </div>

                        <div>
                            <div className="h-30 w-50 flex  justify-center items-center backdrop-brightness-50 absolute z-10  inset-1  group-hover:hidden  font-bold text-white">
                                <button className="p-2 text-white text-sm bg-blue font-bold w-[48%] px-5 rounded-full">
                                    {item?.attributes.title}
                                </button>
                            </div>

                            <div className="absolute z-10 inset-1 flex justify-center items-center font-bold text-white">
                                <Link
                                    to={"/edit/industry/form"}
                                    state={{
                                        id: item?.id,
                                    }}
                                >
                                    <button className="p-2 text-sm  items-center text hidden group-hover:block text-blue bg-white group-hover:text-black font-bold px-5 rounded-full">
                                        <FaEdit className="inline-block mr-2 text-lg" />
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {/*<div*/}
                        {/*    className="absolute inset-0 group-hover:bg-[#242424] group-hover:bg-opacity-[0.7]"></div>*/}
                    </div>
                ))}
            </div>
        </div>

        <div className="p-4 rounded-lg ">
             <h2 className="mb-4 text-sm font-bold text-gray-900 dark:text-white">Industry Piller</h2>
            <div className="grid grid-cols-4  gap-6">
                {data?.industries?.data?.map((item) => (
                    <div
                        key={item?.title}
                        className="group relative flex bg-cover bg-center bg-no-repeat items-center justify-center "
                    >
                        <div>
                            <img
                                className="h-30 w-50"
                                src={item?.attributes?.image?.image ? item?.attributes?.image?.image :  'https://media.istockphoto.com/id/582256640/photo/oil-refinery-chemical-petrochemical-plant.jpg?s=612x612&w=0&k=20&c=BEdsHVe2vUfzRTb9KcsCS_tCH6_R_nKLKkOQCht8AKo='}
                                alt="feature_1"
                            />
                          {console.log(JSON.stringify(item?.image))}
                        
                        </div>

                        <div>
                            <div className="absolute z-10 inset-1 flex justify-center group-hover:hidden items-center font-bold text-white">
                                <button className="p-2 text-white text-sm bg-blue font-bold w-[48%] px-5 rounded-full">
                                    {item?.attributes.title}
                                </button>
                            </div>

                            <div className="absolute z-10 inset-1 flex justify-center items-center font-bold text-white">
                                <Link
                                    to={"/edit/industry/form"}
                                    state={{
                                        id: item?.id,
                                    }}
                                >
                                    <button className="p-2 text-sm  items-center text hidden group-hover:block text-blue bg-white group-hover:text-black font-bold px-5 rounded-full">
                                        <FaEdit className="inline-block mr-2 text-lg" />
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {/*<div*/}
                        {/*    className="absolute inset-0 group-hover:bg-[#242424] group-hover:bg-opacity-[0.7]"></div>*/}
                    </div>
                ))}
            </div>
        </div>

        <div className="p-4 rounded-lg ">
             <h2 className="mb-4 text-sm font-bold text-gray-900 dark:text-white">Industry Use Cases</h2>
            <div className="grid grid-cols-4  gap-6">
                {data?.industries?.data?.map((item) => (
                    <div
                        key={item?.title}
                        className="group relative flex bg-cover bg-center bg-no-repeat items-center justify-center "
                    >
                        <div>
                            <img
                                className="h-30 w-50"
                                src={item?.attributes?.image?.image ? item?.attributes?.image?.image :  'https://media.istockphoto.com/id/582256640/photo/oil-refinery-chemical-petrochemical-plant.jpg?s=612x612&w=0&k=20&c=BEdsHVe2vUfzRTb9KcsCS_tCH6_R_nKLKkOQCht8AKo='}
                                alt="feature_1"
                            />
                          {console.log(JSON.stringify(item?.image))}
                        
                        </div>

                        <div>
                            <div className="absolute z-10 inset-1 flex justify-center group-hover:hidden items-center font-bold text-white">
                                <button className="p-2 text-white text-sm bg-blue font-bold w-[48%] px-5 rounded-full">
                                    {item?.attributes.title}
                                </button>
                            </div>

                            <div className="absolute z-10 inset-1 flex justify-center items-center font-bold text-white">
                                <Link
                                    to={"/edit/industry/form"}
                                    state={{
                                        id: item?.id,
                                    }}
                                >
                                    <button className="p-2 text-sm flex items-center text hidden group-hover:block text-blue bg-white group-hover:text-black font-bold px-5 rounded-full">
                                        <FaEdit className="inline-block mr-2 text-lg" />
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {/*<div*/}
                        {/*    className="absolute inset-0 group-hover:bg-[#242424] group-hover:bg-opacity-[0.7]"></div>*/}
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Home;

/* eslint-disable react/prop-types */
import { useLazyQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { DELETE_INDUSTRY, GET_INDUSTRY_BY_ID } from "../../../../../graphql/query/queries";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import DeleteDialog from "../../../../components/DeleteDialog";

const IndustryCard = ({ id ,refetch}) => {
  const [getIndustryData, { data, loading, error }] = useLazyQuery(
    GET_INDUSTRY_BY_ID,
    {
      variables: {
        id: id,
      },
    }
  );

  const [deleteItem, setDeleteItem] = useState(null);
  const [active,setActive] = useState(false);
  const [deleteIndustry,deleteIndustryAfterDelete] = useMutation(DELETE_INDUSTRY,{
    refetchQueries : GET_INDUSTRY_BY_ID
  });
  

  const handleDelete = (id) => {
    setDeleteItem({
      id : id
    });
    setActive(true)
   
  };

  const handleDeleteindustry = async (id) => {
    try {
      // Execute the deleteIndustry mutation with the provided id
      await deleteIndustry({
        variables: {
          id: id,
        },
      });
  
      // Close the delete confirmation dialog or handle any other logic you need
      setActive(false);
      refetch();
  
      // You may also want to refresh your data or perform any other actions here
    } catch (error) {
      console.error("Error deleting industry:", error);
      // Handle error here
    }
  };

  useEffect(() => {
    getIndustryData();
  }, [getIndustryData]);

  const item = data?.industry?.data;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error :)</div>;
  }

  return (
    <div className="group relative flex bg-cover bg-center bg-no-repeat items-center justify-center" key={item?.id}>
      <div>
        <img
          className="max-h-[11rem] min-w-[19rem]"
          src={
            item?.attributes?.industry_image?.data?.attributes?.url ||
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
              to={{
                pathname: "/edit/industry/form",
               
              }}
              state={{
                id: id
              }}

            
            >
              <button className="p-2 text-sm  items-center text hidden group-hover:block text-blue bg-white group-hover:text-black font-bold px-5 rounded-full">
                <FaEdit className="inline-block mr-2 text-lg" />
                Edit
              </button>
            </Link>

            <button
              onClick={() => handleDelete(id)}
              className="p-2 text-sm  items-center text hidden group-hover:block text-blue hover:bg-red-600 bg-white group-hover:text-black font-bold px-5 rounded-full"
            >
              <MdDelete className="inline-block mr-2 text-lg" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {active &&   (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <DeleteDialog
            data={deleteItem}
            setData={setDeleteItem}
            setActive={setActive}
            handleDeleteindustry={handleDeleteindustry}
            loading={deleteIndustryAfterDelete?.loading}
          />
        </div>
      )}
    </div>
  );
};

export default IndustryCard;

import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { GET_INDUSTRY_BY_ID } from "../../../../../graphql/query/queries";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import DeleteDialog from "../../../../components/DeleteDialog";

// eslint-disable-next-line react/prop-types
const IndustryCard = ({ id }) => {
  const [getIndustryData, { data, loading, error }] = useLazyQuery(
    GET_INDUSTRY_BY_ID,
    {
      variables: {
        id: id,
      },
    }
  );

  const [deleteItem, setDeleteItem] = useState({
    id: null,
    confirm: false,
    open: false,
  });

  const handleDelete = (id, confirm = false) => {
    setDeleteItem({
      id: id,
      confirm: confirm,
      open: true,
    });
  };

  useEffect(() => {
    getIndustryData(); // Fetch the industry detail when the component mounts
  }, [getIndustryData]);

  const item = data?.industry?.data;

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
          className="min-h-[11rem] "
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
              to={"/edit/industry/form"}
              state={{
                id: id,
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

      {/* Delete  */}

      {deleteItem?.open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <DeleteDialog data={deleteItem} setdata={setDeleteItem} />
        </div>
      )}
    </div>
  );
};

export default IndustryCard;

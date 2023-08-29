import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const FilterButton = ({ value , setValue }) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const menuItems = [
    { id: 'id:desc', label: "Latest " },
    { id: 'title:asc', label: "Alphabetical" },
    { id: 'id:asc', label: "incremental" },
  ];

  const handleMenuItemClick = (itemId) => {
    setSelectedOption(itemId);
    setValue((prev) => ({
        ...prev,
        sorting: itemId,
      }));
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="group flex items-center gap-2 text-sm text-white hover:text-blue-400"
        id="menu-button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={toggleOpen}
      >
        Sort <FaAngleDown size={15} />
      </button>

      {open && (
        <div
          className="absolute right-0 z-20 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href="#"
                className={`${
                  selectedOption === item.id
                    ? "font-medium text-white bg-blue-600"
                    : "text-gray-900 "
                } block px-4 py-2 text-sm`}
                role="menuitem"
                tabIndex="-1"
                id={`menu-item-${item.id}`}
                onClick={() => handleMenuItemClick(item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;

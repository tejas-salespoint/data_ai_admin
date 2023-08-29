import { useEffect, useState } from "react";

// Define the LinkInput component
// eslint-disable-next-line react/prop-types
export  function LinkInput({
    
  label,
  value,
  setValue,
  name,
  placeholder,
  required,
  size,
}) {
  const [slug, setSlug] = useState("");

  useEffect(() => {
    // Function to generate a slug from the title
    const generateSlug = (text) => {
      const sanitizedText = text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/[^\w\-]+/g, "") // Remove non-word characters
        .replace(/\-\-+/g, "-") // Replace multiple dashes with a single dash
        .replace(/^-+/, "") // Trim leading dashes
        .replace(/-+$/, ""); // Trim trailing dashes
      return sanitizedText;
    };

    const newSlug = generateSlug(value);
    setSlug(newSlug);
  }, [value]);

  return (
    <div className={size ? `sm:col-span-${size}` : `sm:col-span-2`}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        disabled
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 opacity-50"
        type="text"
        value={slug} // Use the generated slug as the value
        onChange={(e) => setValue(e.target.value)}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

//   <div className={ size ? `sm:col-span-${size}`  : `sm:col-span-2`}>
//   <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//     {label}
//   </label>
//   <input
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//     type="text"
//     name={name}
//     id={name}
//     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//     placeholder={placeholder}
//     required={required}
//   />
// </div>

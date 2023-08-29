import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const ImageUploader = ({ value, setValue, label, isFormSubmitted }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(value);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setValue({ image: imageData }); // Setting the image data to the parent component's state
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile, setValue]);

  useEffect(() => {
    // Reset selectedFile when the form is submitted
    if (isFormSubmitted) {
      setSelectedFile(null);
    }
  }, [isFormSubmitted]);

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: "10px" }}
      />
      {selectedFile && (
        <img
          src={URL.createObjectURL(selectedFile) }
          alt="Preview"
          style={{
            maxWidth: "200px",
            maxHeight: "200px",
            marginBottom: "10px",
          }}
        />
      )}
      {
        value && !selectedFile && (
            <img
          src={value}
          alt="Preview"
          style={{
            maxWidth: "200px",
            maxHeight: "200px",
            marginBottom: "10px",
          }}
        />
        )
      }

     
    </div>
  );
};

export default ImageUploader;
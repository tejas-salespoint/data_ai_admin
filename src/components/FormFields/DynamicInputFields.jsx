import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const DynamicInputFields = ({ value, setValue, label, name, id, placeholder }) => {
    const [inputFields, setInputFields] = useState([]);

    // Update the inputFields state when the value prop changes
    useEffect(() => {
        if (value.length === 0) {
            setInputFields([{ value: '' }]);
        } else {
            setInputFields(value.map((val) => ({ value: val })));
        }
    }, [value]);

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        values[index].value = event.target.value;
        setInputFields(values);
        setValue(values.map((field) => field.value)); // Update the state with the new values
    };

    const handleAddFields = () => {
        setInputFields([...inputFields, { value: '' }]);
        setValue([...inputFields, { value: '' }].map((field) => field.value)); // Update the state with the new values
    };

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
        setValue(values.map((field) => field.value)); // Update the state with the new values
    };

    return (
        <>
            <div className={'grid gap-3 sm:grid-cols-1'}>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{label}</div>
                <div className="grid gap-4 sm:grid-cols-1">
                    {inputFields.map((inputField, index) => (
                        <div className="flex gap-2" key={index}>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                type="text"
                                id={`input-${index}`}
                                name={`input-${index}`}
                                placeholder={placeholder}
                                value={inputField.value}
                                onChange={(event) => handleInputChange(index, event)}
                            />
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFields(index)}
                                    className="ml-2 m-1 p-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center"
                                >
                                    <FaTimes className="mr-1" />
                                </button>
                            )}
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleAddFields}
                            className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DynamicInputFields;

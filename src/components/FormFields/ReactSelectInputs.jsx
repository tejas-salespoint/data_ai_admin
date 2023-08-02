import  { useState } from 'react';

import Select from 'react-select';

// eslint-disable-next-line react/prop-types
const Checkbox = ({ children, ...props }) => (
    <label style={{ marginRight: '1em' }}>
        <input type="checkbox" {...props} />
        {children}
    </label>
);

// eslint-disable-next-line react/prop-types
export default ({options}) => {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const customStyles = {
        control:  (provided, state) => ({
            ...provided,
            // width: '16rem', // Set the width of the control container
            border: `1px solid ${state.isFocused ? 'white' : ''}`,
            // borderRadius: '0.375rem', // Set the border radius
            color : 'white',
            backgroundColor : '#374151'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#111827' : '#374151', // Set the background color to blue if selected, otherwise white
            color: state.isSelected ? 'white' : 'white', // Set the text color to white if selected, otherwise black
        }),
    };

    return (
        <>
            <Select
                className="bg-red-600 rounded-lg"
                styles={customStyles}
                classNamePrefix="select"
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isSearchable={isSearchable}
                name="color"
                options={options}
            />

            <div
                style={{
                    color: 'hsl(0, 0%, 40%)',
                    display: 'inline-block',
                    fontSize: 12,
                    fontStyle: 'italic',
                    marginTop: '1em',
                }}
            >
                <Checkbox
                    checked={isClearable}
                    onChange={() => setIsClearable((state) => !state)}
                >
                    Clearable
                </Checkbox>
                <Checkbox
                    checked={isSearchable}
                    onChange={() => setIsSearchable((state) => !state)}
                >
                    Searchable
                </Checkbox>
                <Checkbox
                    checked={isDisabled}
                    onChange={() => setIsDisabled((state) => !state)}
                >
                    Disabled
                </Checkbox>
                <Checkbox
                    checked={isLoading}
                    onChange={() => setIsLoading((state) => !state)}
                >
                    Loading
                </Checkbox>

            </div>
        </>
    );
};
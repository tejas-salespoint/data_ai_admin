import  { useState } from 'react';

const ItemInput = () => {
    const [inputValue, setInputValue] = useState(''); // State to store the current input value
    const [items, setItems] = useState([]); // State to store the array of items

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update the input value as the user types
    };

    const handleAddItem = () => {
        if (inputValue.trim() !== '') {
            setItems([...items, inputValue]); // Add the input value to the items array
            setInputValue(''); // Clear the input field after adding an item
        }
    };

    const handleSaveItems = () => {
        // Perform any necessary logic with the items array
        
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter an item"
            />
            <button onClick={handleAddItem}>Add Item</button>
            <button onClick={handleSaveItems}>Save Items</button>
        </div>
    );
};

export default ItemInput;

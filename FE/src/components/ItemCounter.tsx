import { useState } from "react";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";

export const ItemCounter = () => {
  const [count, setCount] = useState(1);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setCount(value);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <FiMinusSquare onClick={decrementCount} size={24} className="cursor-pointer" />
      <input
        type="text"
        value={count}
        onChange={handleInputChange}
        className="text-center w-12 border border-gray-300 rounded"
      />
      <FiPlusSquare onClick={incrementCount} size={24} className="cursor-pointer" />
    </div>
  );
};

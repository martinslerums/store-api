import { FaSearch } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useProductStore } from "@/stores/productStore";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const { name, setName } = useProductStore(); 

  const [searchTerm, setSearchTerm] = useState(name || ""); 
  const [showSearch, setShowSearch] = useState(false); 

  const navigate = useNavigate()

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && setName) {
      setName(searchTerm); 
      navigate("/products")
    }
  };

  return (
    <div className="max-w-72 w-full flex">
      {showSearch && (
        <Input
          type="text"
          placeholder="Find a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
      )}

      <Button
        className="-ml-10"
        variant="ghost"
        type="button"
        size="icon"
        onClick={handleShowSearch}
      >
        <FaSearch />
      </Button>
    </div>
  );
};

export default SearchBox;

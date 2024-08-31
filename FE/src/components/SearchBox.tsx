import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useProductStore } from "@/stores/productStore";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const { name, setName } = useProductStore();
  const [searchTerm, setSearchTerm] = useState(name || "");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleShowSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (setName) {
        setName(searchTerm);
      }
      navigate("/products");
    }
  };

  return (
    <div className="relative flex items-center">
      {showSearch ? (
        <Input
          className={`min-w-60 absolute right-full -mr-10 transform outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-l-0 border-r-0 border-t-0 border-b-2 border-black rounded-none opacity-100 tracking-wider pb-2`}
          type="text"
          placeholder="Find a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="min-w-60 absolute right-full -mr-10 transform opacity-0 pointer-events-none"></div>
      )}

      <Button
        className="relative z-10"
        variant="link"
        type="button"
        size="icon"
        onClick={handleShowSearch}
      >
        {showSearch ? <IoIosClose size={30} /> : <CiSearch size={30} />}
      </Button>
    </div>
  );
};

export default SearchBox;

import { useState } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../UI/SearchBar";

const SearchManga = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleClickButton = () => {
    navigate(`/storage/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <SearchBar
        onInputChange={handleInputChange}
        onClickButton={handleClickButton}
      />
      <div>Current value: {searchTerm}</div>
    </>
  );
};

export default SearchManga;

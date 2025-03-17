import { useState } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../UI/SearchBar";

const SearchManga = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleClickButton = () => {
    navigate(`/storage/${query}`);
  };

  return (
    <>
      <SearchBar
        onInputChange={handleInputChange}
        onClickButton={handleClickButton}
      />
      <div>Current value: {query}</div>
    </>
  );
};

export default SearchManga;

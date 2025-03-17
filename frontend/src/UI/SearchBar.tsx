import React from "react";
import styles from "../styles/SearchBar.module.css";

interface SearchBarProps {
  onInputChange: (value: string) => void;
  onClickButton: () => void;
}

const SearchBar = ({ onInputChange, onClickButton }: SearchBarProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  const handleClickButton = () => {
    console.log("search manga");
    onClickButton();
  };

  return (
    <div className={styles["search-bar"]}>
      <input
        type="text"
        id="search-query"
        name="search-query"
        placeholder="Search manga, authors, genres..."
        onChange={handleInputChange}
      />
      <div className={styles["search-icon"]} onClick={handleClickButton}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L16.65 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;

import React from "react";
import SearchIcon from "../assets/Search.png";
import styles from "../styles/SearchBar.module.css";

interface SearchBarProps {
  onInputChange: (value: string) => void;
  onClickButton: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onInputChange,
  onClickButton,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClickButton();
  };

  return (
    <section className={styles["search-section"]}>
      <h1 className={styles['visually-hidden"']}>Manga Search</h1>
      <form className={styles["search-form"]}>
        <input
          type="search"
          className={styles["search-input"]}
          placeholder="Search manga by name, author..."
          id="search-query"
          name="search-query"
          aria-label="Search manga"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className={styles["search-button"]}
          onClick={handleClickButton}
        >
          <img src={SearchIcon} alt="Search" width="34" height="34" />
        </button>
      </form>
    </section>
  );
};

export default SearchBar;

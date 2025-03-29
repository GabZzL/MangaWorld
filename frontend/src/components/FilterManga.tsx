import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "../styles/FilterComponent.module.css";

const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
];

const LANGUAGES = ["English", "Japanese"];

const FilterManga = () => {
  const [selectedGenre, setSelectedGenre] = useState(GENRES[0] || "");
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0] || "");
  const [publicationYear, setPublicationYear] = useState("");

  const navigate = useNavigate();

  const onFilterChange = (filter: string, value: string) => {
    if (filter === "genre") {
      navigate(`/storage/filter-genre?query=${encodeURIComponent(value)}`);
    } else if (filter === "language") {
      navigate(`/storage/filter-language?query=${encodeURIComponent(value)}`);
    } else if (filter === "publicationYear" && value.length === 4) {
      navigate(`/storage/filter-year?query=${encodeURIComponent(value)}`);
    }
  };

  return (
    <section className={styles.filters}>
      <h2 className={styles["visually-hidden"]}>Filter Options</h2>
      <div className={styles["filter-group"]}>
        <label htmlFor="genre" className={styles["filter-label"]}>
          Genre
        </label>
        <select
          id="genre"
          className={styles["filter-select"]}
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            onFilterChange("genre", e.target.value);
          }}
        >
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["filter-group"]}>
        <label htmlFor="language" className={styles["filter-label"]}>
          Language
        </label>
        <select
          id="language"
          className={styles["filter-select"]}
          value={selectedLanguage}
          onChange={(e) => {
            setSelectedLanguage(e.target.value);
            onFilterChange("language", e.target.value);
          }}
        >
          {LANGUAGES.map((lan) => (
            <option key={lan} value={lan}>
              {lan}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["filter-group"]}>
        <label htmlFor="year" className={styles["filter-label"]}>
          Publication Year
        </label>
        <input
          type="number"
          id="year"
          placeholder="Enter year"
          value={publicationYear}
          className={styles["filter-select"]}
          min="4"
          onChange={(e) => {
            setPublicationYear(e.target.value);
            onFilterChange("publicationYear", e.target.value);
          }}
        />
      </div>
    </section>
  );
};

export default FilterManga;

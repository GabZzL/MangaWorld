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

const FilterManga: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState(GENRES[0] || "");
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0] || "");
  const [publicationYear, setPublicationYear] = useState("");

  const navigate = useNavigate();

  const onFilterChange = (filter: string, value: string) => {
    if (filter === "genre") {
      navigate(`/storage/filter-genre?query=${encodeURIComponent(value)}`);
    } else if (filter === "language") {
      navigate(`/storage/filter-language?query=${encodeURIComponent(value)}`);
    } else if (filter === "publicationYear") {
      navigate(`/storage/filter-year?query=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterTitle}>Filter Mangas</h3>

      <div className={styles.filterGroup}>
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            onFilterChange("genre", e.target.value);
          }}
        >
          <option value="">None</option>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="language">Language</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => {
            setSelectedLanguage(e.target.value);
            onFilterChange("language", e.target.value);
          }}
        >
          <option value="">None</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="year">Publication Year</label>
        <input
          type="number"
          id="year"
          placeholder="Enter year"
          value={publicationYear}
          onChange={(e) => {
            setPublicationYear(e.target.value);
            onFilterChange("publicationYear", e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default FilterManga;

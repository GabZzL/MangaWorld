import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import styles from "../styles/MangaForm.module.css";

const MangaForm: React.FC = ({ initialData, onSubmit }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const cancelAction = () => {
    navigate("..");
  };

  return (
    <Form className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="isbn">
          ISBN:
        </label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          minLength={10}
          maxLength={13}
          className={styles.input}
          required
        />
        {errors.isbn && (
          <span className={styles.error}>{errors.isbn._errors[0]}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          minLength={3}
          className={styles.input}
          required
        />
        {errors.title && (
          <span className={styles.error}>{errors.title._errors[0]}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="volume">
          Volume:
        </label>
        <input
          type="number"
          id="volume"
          name="volume"
          className={styles.input}
          min={0}
          required
        />
        {errors.volume && (
          <span className={styles.error}>{errors.volume._errors[0]}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="author">
          Author:
        </label>
        <input
          type="text"
          id="author"
          name="author"
          minLength={3}
          className={styles.input}
          required
        />
        {errors.author && (
          <span className={styles.error}>{errors.author._errors[0]}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="language">
          Language:
        </label>
        <input
          type="text"
          id="language"
          name="language"
          minLength={3}
          className={styles.input}
          required
        />
        {errors.language && (
          <span className={styles.error}>{errors.language._errors[0]}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="stock">
          Stock:
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          min={0}
          className={styles.input}
          required
        />
        {errors.stock && (
          <span className={styles.error}>{errors.stock._errors[0]}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="price">
          Price:
        </label>
        <input
          type="text"
          id="price"
          name="price"
          minLength={1}
          className={styles.input}
          required
        />
        {errors.price && (
          <span className={styles.error}>{errors.price._errors[0]}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="publication_year">
          Publication Year:
        </label>
        <input
          type="number"
          id="publication_year"
          name="publication_year"
          minLength={4}
          className={styles.input}
          required
        />
        {errors.publication_year && (
          <span className={styles.error}>
            {errors.publication_year._errors[0]}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="genres">
          Genres:
        </label>
        <select
          multiple
          id="genres"
          name="genres"
          className={`${styles.input} ${styles.selectMultiple}`}
        >
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Comedy">Comedy</option>
          <option value="Fantasy">Fantasy</option>
        </select>
        {errors.genres && (
          <span className={styles.error}>{errors.genres._errors[0]}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="image">
          Upload Image:
        </label>
        <input
          type="file"
          id="image"
          accept="image/jpeg"
          className={styles.fileInput}
        />
      </div>

      <div>
        <button
          type="button"
          onClick={cancelAction}
          className={styles.submitButton}
        >
          Cancel
        </button>
        <button className={styles.submitButton}>
          {initialData ? "Update" : "Create"} Manga
        </button>
      </div>
    </Form>
  );
};

export default MangaForm;

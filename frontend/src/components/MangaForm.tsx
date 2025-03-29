import React, { useState } from "react";
import { Form, useNavigate, ActionFunction, redirect } from "react-router-dom";
import { createManga, updateManga } from "../services/manga-crud";
import createError from "../utils/create-error";
import { MangaFormProps } from "../types/manga-types";
import styles from "../styles/MangaForm.module.css";

const AVAILABLE_GENRES = [
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

const MangaForm: React.FC<MangaFormProps> = ({ initialData, method }) => {
  const [fileName, setFileName] = useState<string>("No file chosen");
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : "No file chosen");
  };

  const cancelAction = () => {
    navigate("..");
  };

  return (
    <Form
      method={method}
      encType={"multipart/form-data"}
      className={styles["manga-form"]}
      aria-labelledby="formTitle"
    >
      <h2 id="formTitle" className={styles["form-title"]}>
        {method === "post" ? "Add New Manga" : "Edit Manga"}
      </h2>

      <div className={styles["form-grid"]}>
        <div className={styles["form-group"]}>
          <label className={styles["form-label"]} htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            minLength={3}
            className={styles["form-input"]}
            defaultValue={initialData?.title}
            required
          />
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["form-label"]} htmlFor="author">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            minLength={3}
            className={styles["form-input"]}
            defaultValue={initialData?.author}
            required
          />
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["form-label"]} htmlFor="volume">
            Volume:
          </label>
          <input
            type="number"
            id="volume"
            name="volume"
            className={styles["form-input"]}
            min={0}
            defaultValue={initialData?.volume}
            required
          />
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["form-label"]} htmlFor="language">
            Language:
          </label>
          <select
            id="language"
            name="language"
            className={styles["form-select"]}
            defaultValue={initialData?.language}
            required
          >
            <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="japanese">Japanese</option>
          </select>
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["form-label"]} htmlFor="price">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            className={styles["form-input"]}
            defaultValue={initialData?.price}
            required
          />
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["form-label"]} htmlFor="stock">
            Stock:
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            min="0"
            className={styles["form-input"]}
            defaultValue={initialData?.stock}
            required
          />
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["form-label"]} htmlFor="publicationYear">
            Publication Year:
          </label>
          <input
            type="number"
            id="publicationYear"
            name="publicationYear"
            min="1900"
            max="2024"
            className={styles["form-input"]}
            defaultValue={initialData?.publication_year}
            required
          />
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["form-label"]} htmlFor="isbn">
            ISBN:
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            pattern="\d{13}"
            className={styles["form-input"]}
            defaultValue={initialData?.isbn}
            required
          />
        </div>

        <fieldset
          className={`${styles["form-group"]} ${styles["genre-group"]}`}
        >
          <legend className={styles["form-label"]}>Genres:</legend>
          <div className={styles["genre-grid"]}>
            {AVAILABLE_GENRES.map((genre) => (
              <label key={genre} className={styles["genre-label"]}>
                <input type="checkbox" name="genres" value={genre} /> {genre}
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles["form-group"]}>
          <label className={styles["form-label"]} htmlFor="image">
            Upload Image:
          </label>
          <div className={styles["file-upload"]}>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/jpeg,image/png"
              className={styles["file-input"]}
              onChange={handleFileChange}
            />
            <label htmlFor="image" className={styles["file-label"]}>
              Choose File
            </label>
            <span className={styles["file-name"]} aria-live="polite">
              {fileName}
            </span>
          </div>
        </div>
      </div>

      <div className={styles["form-actions"]}>
        <button
          type="button"
          onClick={cancelAction}
          className={`${styles["btn"]} ${styles["cancel-btn"]}`}
        >
          Cancel
        </button>
        <button className={`${styles["btn"]} ${styles["submit-btn"]}`}>
          {initialData ? "Update" : "Create"} Manga
        </button>
      </div>
    </Form>
  );
};

export default MangaForm;

export const FormAction: ActionFunction = async ({ request, params }) => {
  const method = request.method.toLowerCase();
  const formData = await request.formData();

  if (method === "patch") {
    const mangaId = params.id;

    const updatedManga = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      isbn: formData.get("isbn") as string,
      volume: Number(formData.get("volume")),
      language: formData.get("language") as string,
      stock: Number(formData.get("stock")),
      price: Number(formData.get("price")),
      publicationYear: Number(formData.get("publicationYear")),
      genres: formData.getAll("genres") as string[],
    };

    const response = await updateManga(mangaId, updatedManga);

    if (!response) {
      createError({
        status: 500,
        message: "Could not update the manga",
        statusText: "Interval Server Error",
      });
    }
  }

  if (method === "post") {
    const imageFile = formData.get("image") as File;

    if (!imageFile || imageFile.size === 0) {
      createError({
        status: 400,
        message: "Could not create manga",
        statusText: "Image file is required",
      });
    }

    const response = await createManga(formData);

    if (!response) {
      createError({
        status: 500,
        message: "Could not create manga",
        statusText: "Interval Server Error",
      });
    }
  }

  return redirect("/storage");
};

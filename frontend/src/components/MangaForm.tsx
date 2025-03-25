import React, { useState, ChangeEvent } from "react";
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    initialData?.genres || []
  );
  const navigate = useNavigate();

  const cancelAction = () => {
    navigate("..");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options;
    const selectedValues: string[] = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }

    setSelectedGenres(selectedValues);
  };

  return (
    <Form
      method={method}
      encType={"multipart/form-data"}
      className={styles.form}
    >
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
          defaultValue={initialData?.isbn}
          required
        />
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
          defaultValue={initialData?.title}
          required
        />
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
          defaultValue={initialData?.volume}
          required
        />
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
          defaultValue={initialData?.author}
          required
        />
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
          defaultValue={initialData?.language}
          required
        />
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
          defaultValue={initialData?.stock}
          required
        />
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
          defaultValue={initialData?.price}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="publicationYear">
          Publication Year:
        </label>
        <input
          type="number"
          id="publicationYear"
          name="publicationYear"
          minLength={4}
          className={styles.input}
          defaultValue={initialData?.publication_year}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="genres">
          Genres:
        </label>
        <select
          multiple
          id="genres"
          name="genres"
          value={selectedGenres}
          onChange={handleGenreChange}
          className={`${styles.input} ${styles.selectMultiple}`}
        >
          {AVAILABLE_GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="image">
          Upload Image:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/jpeg,image/png"
          className={styles.fileInput}
          onChange={handleImageChange}
        />
        {initialData?.image_url && (
          <img src={initialData.image_url} alt="manga image" />
        )}
        {previewImage && <img src={previewImage} alt="preview" />}
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

export const FormAction: ActionFunction = async ({ request, params }) => {
  const method = request.method.toLowerCase();
  const formData = await request.formData();

  console.log(method);

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

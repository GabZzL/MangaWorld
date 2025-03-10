import React, { useState, useRef, ChangeEvent, FormEvent } from "react";

interface MangaFormData {
  isbn: string;
  title: string;
  volume: number;
  author: string;
  genres: string;
  language: string;
  stock: number;
  price: number;
  publicationYear: number;
  image?: File;
}

interface ApiResponse {
  message?: string;
  error?: string;
}

const MangaForm: React.FC = () => {
  const [formState, setFormState] = useState<MangaFormData>({
    isbn: "",
    title: "",
    volume: 1,
    author: "",
    genres: "",
    language: "Japanese",
    stock: 10,
    price: 19.99,
    publicationYear: 2011,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormState((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "genres" ? value : parseFloat(value) || value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // Append image file
    if (formState.image) {
      formData.append("image", formState.image);
    }

    const genresArray = formState.genres
      .split(",")
      .map((g) => g.trim())
      .filter((g) => g.length > 0);

    // Append other fields
    Object.entries(formState).forEach(([key, value]) => {
      if (key === "image") return;

      if (key === "genres") {
        // Append each genre individually
        genresArray.forEach((genre) => formData.append("genres", genre));
      } else {
        formData.append(key, value.toString());
      }
    });

    try {
      const response = await fetch("http://localhost:3000/inventory", {
        method: "POST",
        body: formData, // Content-Type header will be set automatically
      });

      const data: ApiResponse = await response.json();
      setResponse(data);

      if (response.ok) {
        // Reset form on success
        setFormState({
          isbn: "",
          title: "",
          volume: 1,
          author: "",
          genres: "",
          language: "Japanese",
          stock: 10,
          price: 19.99,
          publicationYear: new Date().getFullYear(),
        });
        setPreviewImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error) {
      setResponse({ error: "Network error - check console" });
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="form-container">
      <h1>Create Manga</h1>

      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="image">Cover Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            ref={fileInputRef}
            required
          />
          {previewImage && (
            <img src={previewImage} alt="Preview" className="image-preview" />
          )}
        </div>

        {/* Text Inputs */}
        {Object.entries(formState).map(([key, value]) => {
          if (key === "image") return null;

          return (
            <div className="form-group" key={key}>
              <label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                type={typeof value === "number" ? "number" : "text"}
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
                required
                step={key === "price" ? 0.01 : undefined}
              />
              {key === "genres" && (
                <small className="hint">
                  Comma-separated (e.g., Action, Adventure)
                </small>
              )}
            </div>
          );
        })}

        <button type="submit">Submit</button>
      </form>

      {/* Response Feedback */}
      {response && (
        <div className={`response ${response.error ? "error" : "success"}`}>
          {response.message || response.error}
        </div>
      )}
    </div>
  );
};

export default MangaForm;

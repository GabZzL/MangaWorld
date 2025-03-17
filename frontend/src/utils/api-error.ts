import axios from "axios";

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("API Error:", error.response?.data || error.message);
    alert(`Error: ${error.response?.data?.error || "Something went wrong!"}`);
  } else {
    console.error("Unexpected Error:", error);
    alert("An unexpected error occurred.");
  }
};

export default handleApiError;

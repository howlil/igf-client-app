import { create } from "zustand";

const useFormStore = create((set, get) => ({
  // State for AccountForm
  conference_id: "1",
  email: "",
  password: "",
  confirm_password: "",
  username: "",
  phone_number: "",

  // State for CompanyForm
  company_name: "",
  representative_name: "",
  address: "",
  company_logo: "",
  about_us: "",

  // State for Classification
  company_type: "",
  country: "",
  key_product_lines: [],

  // State for Schedule
  schedules: [],

  // Actions to update AccountForm state
  setAccountForm: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  // Actions to update CompanyForm state
  setCompanyForm: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  // Actions to update Classification
  setClassification: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  // Actions to update Schedule
  setSchedules: (schedule) =>
    set((state) => ({
      schedules: [...state.schedules, schedule],
    })),

  // Generic setter for any field
  setField: (field, value) =>
    set((state) => ({
      [field]: value,
    })),

  // Action to submit form data to API
  submitForm: async () => {
    const state = get(); // Access the current state

    // Combine all form data
    const formData = new FormData();
    formData.append("conference_id", state.conference_id);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("confirm_password", state.confirm_password);
    formData.append("username", state.username);
    formData.append("phone_number", state.phone_number);
    formData.append("company_name", state.company_name);
    formData.append("representative_name", state.representative_name);
    formData.append("address", state.address);
    formData.append("company_logo", state.company_logo); // Assuming this is a file
    formData.append("about_us", state.about_us);
    formData.append("company_type", state.company_type);
    formData.append("country", state.country);
    state.key_product_lines.forEach((line) => formData.append("key_product_lines[]", line));
    state.schedules.forEach((schedule, index) => {
      formData.append(`schedules[${index}][date]`, schedule.date);
      formData.append(`schedules[${index}][time_start]`, schedule.time_start);
      formData.append(`schedules[${index}][time_end]`, schedule.time_end);
    });

    try {
      const response = await fetch("https://api-igf-connect.metrosoftware.id/api/companys", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      set(() => ({
        conference_id: "1",
        email: "",
        password: "",
        confirm_password: "",
        username: "",
        phone_number: "",
        company_name: "",
        representative_name: "",
        address: "",
        company_logo: "",
        about_us: "",
        company_type: "",
        country: "",
        key_product_lines: [],
        schedules: [],
      }));
      return result

 
    } catch (error) {
      console.error("Failed to submit form:", error);
      alert("Failed to submit form. Please try again.");
    }
  },
}));

export default useFormStore;

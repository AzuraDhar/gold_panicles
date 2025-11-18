import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../js/supabaseClient.js";

function EditRequestForm({ requestData, onClose }) {
  const [formData, setFormData] = useState({
    request_title: "",
    request_description: "",
    request_date: "",
    request_time: "",
    request_location: "",
    request_contactPerson: "",
    request_contactInfo: "",
    request_serviceNeed: "",
    request_file: "",
  });

  // ✅ Pre-fill form when editing
  useEffect(() => {
    if (requestData) {
      setFormData({
        request_title: requestData.request_title || "",
        request_description: requestData.request_description || "",
        request_date: requestData.request_date || "",
        request_time: requestData.request_time || "",
        request_location: requestData.request_location || "",
        request_contactPerson: requestData.request_contactPerson || "",
        request_contactInfo: requestData.request_contactInfo || "",
        request_serviceNeed: requestData.request_serviceNeed || "",
        request_file: requestData.request_file || "",
      });
    }
  }, [requestData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("clientRequest")
      .update(formData)
      .eq("id", requestData.id); // 👈 Make sure your table has a column named 'id'

    if (error) {
      console.error("❌ Error updating data:", error);
      alert("Something went wrong!");
    } else {
      console.log("✅ Data updated successfully:", data);
      alert("Request updated successfully!");
      if (onClose) onClose(); // 👈 Close modal after update
    }
  };

  return (
    <form className="request_form_con" onSubmit={handleSubmit}>
      <div className="input-group mb-3 mt-3 form_con">
        <input
          type="text"
          name="request_title"
          className="form-control"
          placeholder="Title"
          value={formData.request_title}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-3 mt-1 form_con">
        <input
          type="text"
          name="request_description"
          className="form-control"
          placeholder="Description"
          value={formData.request_description}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-3 mt-1 form_con">
        <input
          type="date"
          name="request_date"
          className="form-control"
          value={formData.request_date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="request_time"
          className="form-control"
          value={formData.request_time}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-3 mt-1 form_con">
        <input
          type="text"
          name="request_location"
          className="form-control"
          placeholder="Location"
          value={formData.request_location}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-3 mt-1 form_con">
        <input
          type="text"
          name="request_contactPerson"
          className="form-control"
          placeholder="Person to Contact"
          value={formData.request_contactPerson}
          onChange={handleChange}
        />
        <input
          type="text"
          name="request_contactInfo"
          className="form-control"
          placeholder="Contact Info"
          value={formData.request_contactInfo}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-3 mt-1 form_con">
        <input
          type="text"
          name="request_serviceNeed"
          className="form-control"
          placeholder="Service Needed"
          value={formData.request_serviceNeed}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-3 mt-1 form_con">
        <input
          type="text"
          name="request_file"
          className="form-control"
          placeholder="Attach File"
          value={formData.request_file}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary mt-3" type="submit">
        Update
      </button>
    </form>
  );
}

export default EditRequestForm;

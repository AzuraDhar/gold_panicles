import React, { useState } from "react";
import { supabase } from "../../../../../js/supabaseClient.js"; // adjust path if needed

function AddStaff() {
  const [formData, setFormData] = useState({
    staff_fname: "",
    staff_lname: "",
    staff_email: "",
    staff_password: "",
    staff_section: "",
    staff_position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("adminStaff").insert([formData]);

    if (error) {
      console.error("❌ Error inserting data:", error.message, error.details, error.hint);
      alert(`Something went wrong!\n${error.message}`);
      return;
    }

    console.log("✅ Data inserted successfully:", data);
    alert("Staff added successfully!");

    setFormData({
      staff_fname: "",
      staff_lname: "",
      staff_email: "",
      staff_password: "",
      staff_section: "",
      staff_position: "",
    });
  };

  return (
    <>
      <form className="request_form_con" onSubmit={handleSubmit}>
        <div className="input-group mb-3 mt-3 form_con">
          <input
            type="text"
            name="staff_fname"
            className="form-control"
            placeholder="First Name"
            value={formData.staff_fname}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="staff_lname"
            className="form-control"
            placeholder="Last Name"
            value={formData.staff_lname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group mb-3 mt-1 form_con">
          <input
            type="email"
            name="staff_email"
            className="form-control"
            placeholder="Email Address"
            value={formData.staff_email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group mb-3 mt-1 form_con">
          <input
            type="password"
            name="staff_password"
            className="form-control"
            placeholder="Password"
            value={formData.staff_password}
            onChange={handleChange}
            required
          />
        </div>

        {/* SECTION and POSITION as dropdowns */}
        <div className="input-group mb-3 mt-1 form_con">
          <select
            name="staff_section"
            className="form-select"
            value={formData.staff_section}
            onChange={handleChange}
            required
          >
            <option value="">Select Section</option>
            <option value="Executives">Executives</option>
            <option value="Scribes">Scribes</option>
            <option value="Creatives">Creatives</option>
            <option value="Managerial">Managerial</option>
          </select>

          <select
            name="staff_position"
            className="form-select"
            value={formData.staff_position}
            onChange={handleChange}
            required
          >
            <option value="">Select Position</option>
            <option value="President">President</option>
            <option value="Vice President">Vice President</option>
            <option value="Secretary">Secretary</option>
            <option value="Treasurer">Treasurer</option>
            <option value="Member">Member</option>
          </select>
        </div>

        <button className="btn btn-primary mt-3" type="submit">
          Create Account
        </button>
      </form>
    </>
  );
}

export default AddStaff;

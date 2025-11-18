import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../js/supabaseClient.js";

function UpdateForm({ staffId, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    staff_fname: "",
    staff_lname: "",
    staff_email: "",
    staff_section: "",
    staff_position: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch the staff info when opened
  useEffect(() => {
    const fetchStaff = async () => {
      const { data, error } = await supabase
        .from("adminStaff")
        .select("*")
        .eq("staff_id", staffId)
        .single();

      if (error) {
        console.error("Error loading staff:", error);
      } else {
        setFormData(data);
      }
      setLoading(false);
    };

    fetchStaff();
  }, [staffId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("adminStaff")
      .update({
        staff_fname: formData.staff_fname,
        staff_lname: formData.staff_lname,
        staff_email: formData.staff_email,
        staff_section: formData.staff_section,
        staff_position: formData.staff_position,
      })
      .eq("staff_id", staffId);

    if (error) {
      console.error("Error updating staff:", error);
      alert("❌ Failed to update staff.");
    } else {
      alert("✅ Staff updated successfully!");
      onUpdated(); // Refresh staff list
      onClose(); // Close update panel
    }
  };

  if (loading) return <p className="mt-3">Loading staff info...</p>;

  return (
    <div className="mt-3 p-3 border rounded bg-light more_info"
            style={{ position: "absolute", zIndex: 9999 }}
    >
      <h6>Update Staff Information</h6>
      <form onSubmit={handleUpdate}>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="staff_fname"
              value={formData.staff_fname}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="staff_lname"
              value={formData.staff_lname}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="mt-2">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="staff_email"
            value={formData.staff_email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mt-2">
          <label className="form-label">Section</label>
          <input
            type="text"
            name="staff_section"
            value={formData.staff_section}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mt-2">
          <label className="form-label">Position</label>
          <input
            type="text"
            name="staff_position"
            value={formData.staff_position}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;

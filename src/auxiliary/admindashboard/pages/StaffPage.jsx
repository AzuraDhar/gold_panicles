import React, { useState, useEffect } from "react";
import { supabase } from "../../../js/supabaseClient";
import AddStaff from "./client/modal/AddStaff";
import UpdateForm from "./client/modal/UpdateForm.jsx"; 

function StaffPage() {
  const [menuItems] = useState([
    { name: "All" },
    { name: "Executives" },
    { name: "Scribes" },
    { name: "Creatives" },
    { name: "Managerial" },
  ]);

  const [activeTab, setActiveTab] = useState("All");
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [expandedStaffId, setExpandedStaffId] = useState(null);

  // Fetch staff from Supabase
  const fetchStaff = async () => {
    const { data, error } = await supabase.from("adminStaff").select("*");
    if (error) console.error("Error fetching staff:", error);
    else setStaffList(data);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Delete staff handler
  const handleDelete = async (staff_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this staff member?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("adminStaff")
      .delete()
      .eq("staff_id", staff_id);

    if (error) {
      console.error("Error deleting staff:", error);
      alert("Failed to delete staff.");
    } else {
      alert("✅ Staff removed successfully.");
      setSelectedStaff(null);
      setShowOptions(false);
      fetchStaff();
    }
  };

  const handleAddStaffClick = () => {
    setShowAddStaff(!showAddStaff);
  };

  // Render staff
  const renderStaffSection = (sectionName) => {
    const filtered =
      sectionName === "All"
        ? staffList
        : staffList.filter((s) => s.staff_section === sectionName);

    if (filtered.length === 0)
      return (
        <p className="text-center mt-3 text-muted">
          No {sectionName === "All" ? "staff" : sectionName.toLowerCase()} found
        </p>
      );

    return filtered.map((staff, index) => (
      <div key={index} className="border-bottom py-2 request_content">
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            if (e.target.tagName !== "BUTTON") {
              setSelectedStaff(staff);
              setShowOptions(false);
              setExpandedStaffId(null);
            }
          }}
        >
          <span className="ms-3 flex-grow-2">
            {staff.staff_fname} {staff.staff_lname}
          </span>

          {activeTab === "All" ? (
            <span className="ms-3 flex-grow-1">{staff.staff_section}</span>
          ) : (
            <span className="ms-3 flex-grow-1">{staff.staff_position}</span>
          )}

          {activeTab === "All" ? (
            <span className="me-4 flex-grow-1 text-end">
              {staff.staff_position}
            </span>
          ) : (
            <span className="me-3 flex-grow-1 d-flex gap-2 justify-content-end">
              <button
                className="btn btn-primary btn-sm"
                onClick={(e) => {
                  e.stopPropagation();

                  if (
                    selectedStaff &&
                    selectedStaff.staff_id === staff.staff_id
                  ) {
                    setShowOptions((prev) => !prev);
                    setExpandedStaffId(null);
                    setSelectedStaff(null);
                  } else {
                    setSelectedStaff(staff);
                    setShowOptions(true);
                    setExpandedStaffId(null);
                  }
                }}
              >
                Option
              </button>
            </span>
          )}
        </div>
      </div>
    ));
  };

  return (
    <>
      {/* Header */}
      <div className="requestnav d-flex justify-content-between align-items-center">
        <div className="left-nav d-flex align-items-center">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`nav_menu_item requestnav_item ms-5 mb-2 mt-4 ${
                activeTab === item.name ? "active_tab" : ""
              }`}
              onClick={() => {
                setActiveTab(item.name);
                setSelectedStaff(null);
                setExpandedStaffId(null);
                setShowOptions(false);
              }}
            >
              <p className="menu_text m-0">{item.name}</p>
            </div>
          ))}
        </div>

        <div className="right-nav me-5 mt-3">
          <button className="btn btn-warning" onClick={handleAddStaffClick}>
            {showAddStaff ? "Close" : "Add Staff"}
          </button>
        </div>
      </div>

      {/* Add Staff Form */}
      {showAddStaff && (
        <div className="add-staff mt-3 p-3 border rounded">
          <h5 className="ms-2">Create New Staff Account</h5>
          <hr />
          <AddStaff />
        </div>
      )}

      {/* Body */}
      <div className="requestbody">
        <div className="approvedrequest mt-2">
          {/* Table Header */}
          <h6 className="d-flex justify-content-between mt-2 mb-2">
            <span className="ms-3 flex-grow-2">Staffer</span>
            <span className="ms-3 flex-grow-1">
              {activeTab === "All" ? "Segment" : "Position"}
            </span>

            {activeTab === "All" ? (
              <span className="me-3 flex-grow-1 text-end">Position</span>
            ) : (
              <span className="me-3 flex-grow-1 text-end">Action</span>
            )}
          </h6>

          {/* UPDATE FORM (More Info) */}
          {expandedStaffId && (
            <UpdateForm
              staffId={expandedStaffId}
              onClose={() => {
                // 🔥 Close the update form and also clear selected staff
                setExpandedStaffId(null);
                setSelectedStaff(null);
              }}
              onUpdated={() => {
                // 🔥 Refresh the list and close everything cleanly
                fetchStaff();
                setExpandedStaffId(null);
                setSelectedStaff(null);
              }}
            />
          )}


          {/* OPTIONS PANEL */}
          {showOptions && selectedStaff && activeTab !== "All" && (
            <div className="optionButton d-flex gap-2 justify-content-center mb-3">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setExpandedStaffId(selectedStaff.staff_id);
                  setShowOptions(false);
                }}
              >
                Update
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(selectedStaff.staff_id)}
              >
                Remove
              </button>
            </div>
          )}

          {/* Staff List */}
          {renderStaffSection(activeTab)}

          {/* Staff Details Panel */}
          {selectedStaff && !showOptions && !expandedStaffId && (
            <div
              className="mt-3 p-3 border rounded bg-light update_info"
              style={{ position: "relative", zIndex: 9999 }}
            >
              <h6>Staff Details</h6>
              <p>
                <strong>Name:</strong> {selectedStaff.staff_fname}{" "}
                {selectedStaff.staff_lname}
              </p>
              <p>
                <strong>Email:</strong> {selectedStaff.staff_email}
              </p>
              <p>
                <strong>Section:</strong> {selectedStaff.staff_section}
              </p>
              <p>
                <strong>Position:</strong> {selectedStaff.staff_position}
              </p>

              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSelectedStaff(null);
                    setShowOptions(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StaffPage;

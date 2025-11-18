import { useEffect, useState } from "react";
import { supabase } from "../../../js/supabaseClient.js";

function AssignmentPage() {
  const [menuItems] = useState([
    { name: "Pending Assignment" },
    { name: "Approved Assignment" },
  ]);
  const [activeTab, setActiveTab] = useState("Pending Assignment");
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // ✅ Fetch all client requests (pending assignments)
  const fetchAssignments = async () => {
    const { data, error } = await supabase
      .from("clientRequest")
      .select("*")
      .order("date_request", { ascending: false });

    if (error) console.error("Error fetching assignments:", error);
    else setAssignments(data);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // ✅ Approve (or Assign) request
  const handleApprove = async (id) => {
    const confirmApprove = window.confirm("Mark this assignment as approved?");
    if (!confirmApprove) return;

    const { error } = await supabase
      .from("clientRequest")
      .update({ request_status: "approved" })
      .eq("id", id);

    if (error) {
      console.error("Error approving assignment:", error);
      alert("❌ Failed to approve assignment.");
    } else {
      alert("✅ Assignment approved successfully!");
      setSelectedAssignment(null);
      fetchAssignments();
    }
  };

  return (
    <>
      {/* Navigation Tabs */}
      <div className="requestnav">
        {menuItems.map((item, index) => (
          <span
            key={index}
            className={`nav_menu_item requestnav_item ms-5 mb-2 ${
              activeTab === item.name ? "active_tab" : ""
            }`}
            onClick={() => {
              setActiveTab(item.name);
              setSelectedAssignment(null);
            }}
          >
            <p className="menu_text">{item.name}</p>
          </span>
        ))}
      </div>

      <div className="requestbody">
        {/* ✅ PENDING ASSIGNMENTS */}
        {activeTab === "Pending Assignment" && (
          <div className="pendingrequest mt-2">
            <h6 className="d-flex justify-content-between mt-2 mb-2 fw-bold">
              <span className="ms-3 flex-grow-2">Title</span>
              <span className="me-3 flex-grow-1">Date Approved</span>
              <span className="me-3 flex-grow-1 text-end">Action</span>
            </h6>

            {assignments.filter((req) => req.request_status !== "approved")
              .length > 0 ? (
              assignments
                .filter((req) => req.request_status !== "approved")
                .map((req, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center border-bottom py-2 request_content"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedAssignment(req)}
                  >
                    <span className="ms-3 flex-grow-2">
                      {req.request_title}
                    </span>
                    <span className="me-3 flex-grow-1">
                      {req.date_request
                        ? new Date(req.date_request).toLocaleDateString()
                        : "N/A"}
                    </span>
                    <span className="me-3 flex-grow-1 text-end">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(req.id);
                        }}
                      >
                        Assign
                      </button>
                    </span>
                  </div>
                ))
            ) : (
              <p className="text-center mt-3 text-muted">
                No pending assignments found.
              </p>
            )}
          </div>
        )}

        {/* ✅ APPROVED ASSIGNMENTS */}
        {activeTab === "Approved Assignment" && (
          <div className="approvedrequest mt-2">
            <h6 className="d-flex justify-content-between mt-2 mb-2 fw-bold">
              <span className="ms-3 flex-grow-2">Title</span>
              <span className="me-3 flex-grow-1">Date Assigned</span>
              <span className="me-3 flex-grow-1">Assigned To</span>
              <span className="me-3 flex-grow-1 text-end">Status</span>
            </h6>

            {assignments.filter((req) => req.request_status === "approved")
              .length > 0 ? (
              assignments
                .filter((req) => req.request_status === "approved")
                .map((req, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center border-bottom py-2"
                    onClick={() => setSelectedAssignment(req)}
                  >
                    <span className="ms-3 flex-grow-2">
                      {req.request_title}
                    </span>
                    <span className="me-3 flex-grow-1">
                      {req.date_request
                        ? new Date(req.date_request).toLocaleDateString()
                        : "N/A"}
                    </span>
                    <span className="me-3 flex-grow-1">
                      {req.assigned_to || "—"}
                    </span>
                    <span className="me-3 flex-grow-1 text-end">
                      {req.request_status}
                    </span>
                  </div>
                ))
            ) : (
              <p className="text-center mt-3 text-muted">
                No approved assignments found.
              </p>
            )}
          </div>
        )}

        {/* ✅ Assignment Details Panel */}
        {selectedAssignment && (
          <div className="mt-3 p-3 border rounded bg-light request_details">
            <h6>Assignment Details</h6>
            <p>
              <strong>Title:</strong> {selectedAssignment.request_title}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedAssignment.request_description}
            </p>
            <p>
              <strong>Date Requested:</strong>{" "}
              {new Date(selectedAssignment.date_request).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {selectedAssignment.request_status}
            </p>

            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setSelectedAssignment(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AssignmentPage;

import { useEffect, useState } from "react";
import { supabase } from "../../../../js/supabaseClient";
import EditRequestForm from "./modal/EditRequestForm";

function ClientRequest() {
  const [menuItems] = useState([{ name: "Request Tracker" }]);
  const [activeTab, setActiveTab] = useState("Request Tracker");
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editRequest, setChangeRequest] = useState(null);

  // ✅ Fetch all requests from Supabase
  const fetchRequests = async () => {
    const { data, error } = await supabase.from("clientRequest").select("*");
    if (error) console.error("Error fetching requests:", error);
    else setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Delete specific request
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to deny this request?"
  );
  if (!confirmDelete) return;

  const { error } = await supabase
    .from("clientRequest")
    .update({ request_status: "denied" }) // 👈 updated field name
    .eq("id", id);

  if (error) {
    console.error("❌ Error updating status:", error);
    alert("Failed to update request status.");
  } else {
    alert("✅ Request has been marked as 'Denied'.");
    setSelectedRequest(null); // hide details panel
    // ✅ Refresh request list
    const { data } = await supabase.from("clientRequest").select("*");
    setRequests(data);
  }
};


  return (
    <>
      <div className="requestnav">
        {menuItems.map((item, index) => (
          <span
            key={index}
            className={`nav_menu_item requestnav_item ms-5 mb-2 ${
              activeTab === item.name ? "active_tab" : ""
            }`}
            onClick={() => setActiveTab(item.name)}
          >
            <p className="menu_text">{item.name}</p>
          </span>
        ))}
      </div>

      {/* show/hide section based on activeTab */}
      <div className="requestbody">
        {activeTab === "Request Tracker" && (
          <div className="pendingrequest mt-2">
            <h6 className="d-flex justify-content-between mt-2 mb-2 fw-bold">
              <span className="ms-3 flex-grow-2">Title</span>
              <span className="me-3 flex-grow-1">Date Requested</span>
              <span className="me-3 flex-grow-1">Status</span>
            </h6>

            {requests.filter(req => req.request_status !== "denied").length > 0 ? (
              requests
                .filter(req => req.request_status !== "denied")
                .map((req, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center border-bottom py-2 request_content"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedRequest(req)}
                >
                  <span className="ms-3 flex-grow-2">{req.request_title}</span>
                  <span className="me-3 flex-grow-1">
                    {new Date(req.request_date).toLocaleDateString()}
                  </span>
                  <span className="me-3 flex-grow-1">{req.request_status}</span>
                </div>
              ))
            ) : (
              <p className="text-center mt-3 text-muted">No requests found</p>
            )}
          </div>
        )}

        {/* ✅ Show request details */}
        {selectedRequest && (
          <div className="mt-3 p-3 border rounded bg-light request_details">
            <h6>Request Details</h6>
            <p>
              <strong>Title:</strong> {selectedRequest.request_title}
            </p>
            <p>
              <strong>Description:</strong> {selectedRequest.request_description}
            </p>
            <p>
              <strong>Date Requested:</strong>{" "}
              {new Date(selectedRequest.request_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {selectedRequest.request_time}
            </p>
            <p>
              <strong>Status:</strong> {selectedRequest.request_status}
            </p>
            <p>
              <strong>Location:</strong> {selectedRequest.request_location}
            </p>

            <div className="request_details_botNav d-flex justify-content-between mt-3">
              <button
                className="btn btn-sm btn-secondary btn-wide"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-warning btn-small"
                  onClick={() => setChangeRequest(selectedRequest)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-danger btn-medium"
                  onClick={() => handleDelete(selectedRequest.id)}
                >
                  🗑 Deny
              </button>

              </div>
            </div>
          </div>
        )}

        {/* ✅ Edit Request Modal */}
        {editRequest && (
          <div className="changeRequest">
            <div className="request_form">
              <div className="requestNav flex-grow-2 d-flex justify-content-between align-items-center">
                <p className="requestTitle mt-2">Edit Request</p>

                <button
                  className="btn flex-grow-1"
                  onClick={() => setChangeRequest(null)}
                >
                  ❌
                </button>
              </div>

              <EditRequestForm
                requestData={editRequest}
                onClose={() => {
                  setChangeRequest(null);
                  fetchRequests(); // ✅ refresh after update
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ClientRequest;

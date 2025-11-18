import React, { useState, useEffect } from "react";
import { supabase } from "../../../js/supabaseClient.js";

function RequestPage() {
  const [menuItems] = useState([
    { name: "Pending Request" },
    { name: "Approved Request" },
    { name: "Denied Request" },
  ]);
  const [activeTab, setActiveTab] = useState("Pending Request");

  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [deniedRequests, setDeniedRequests] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  // ✅ Fetch Pending Requests
  const fetchPendingRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("clientRequest")
        .select("*")
        .eq("request_status", "Pending");

      if (error) throw error;
      setPendingRequests(data);
    } catch (err) {
      console.error("Error fetching pending requests:", err.message);
    }
  };

  // ✅ Fetch Approved Requests
  const fetchApprovedRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("clientRequest")
        .select("*")
        .eq("request_status", "Approved");

      if (error) throw error;
      setApprovedRequests(data);
    } catch (err) {
      console.error("Error fetching approved requests:", err.message);
    }
  };

  // ✅ Fetch Denied Requests
  const fetchDeniedRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("clientRequest")
        .select("*")
        .eq("request_status", "Denied");

      if (error) throw error;
      setDeniedRequests(data);
    } catch (err) {
      console.error("Error fetching denied requests:", err.message);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
    fetchApprovedRequests();
    fetchDeniedRequests();
  }, []);

  // ✅ Toggle hidden div visibility
  const handleRowClick = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  // ✅ Update request status (Approved or Denied)
  const updateRequestStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from("clientRequest")
        .update({ request_status: newStatus })
        .eq("id", id);

      if (error) throw error;

      // ✅ Refresh lists after update
      fetchPendingRequests();
      fetchApprovedRequests();
      fetchDeniedRequests();

      setExpandedId(null); // close expanded div
      console.log(`Request ${id} updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating status:", err.message);
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
            onClick={() => {
              setActiveTab(item.name);
              setExpandedId(null);
            }}
          >
            <p className="menu_text">{item.name}</p>
          </span>
        ))}
      </div>

      <div className="requestbody">
        {/* ✅ PENDING REQUESTS */}
        {activeTab === "Pending Request" && (
          <div className="pendingrequest mt-2">
            <h6 className="d-flex justify-content-between mt-2 mb-2 fw-bold">
              <span className="ms-3">Title</span>
              <span className="me-3">Date Requested</span>
            </h6>

            {pendingRequests.length > 0 ? (
              pendingRequests.map((req) => (
                <div key={req.id} className="pending_request_wrapper">
                  <div
                    className={`d-flex justify-content-between align-items-center py-2 px-3 pending_adminRequest ${
                      expandedId === req.id ? "active_row" : ""
                    }`}
                    onClick={() => handleRowClick(req.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{req.request_title}</span>
                    <span>
                      {req.request_date
                        ? new Date(req.request_date).toLocaleDateString()
                        : "—"}
                    </span>
                  </div>

                  {expandedId === req.id && (
                    <div className="request_details bg-light p-3 border rounded mt-1 mx-3 request_choices">
                      <p className="mb-1">
                        <strong>Client Name:</strong> {req.client_name || "N/A"}
                      </p>
                      <p className="mb-1">
                        <strong>Description:</strong>{" "}
                        {req.request_description || "No details available."}
                      </p>
                      <p className="mb-0">
                        <strong>Status:</strong> {req.request_status}
                      </p>

                      <div className="d-flex justify-content-end gap-2 mt-2">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            updateRequestStatus(req.id, "Approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => updateRequestStatus(req.id, "Denied")}
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center mt-3 text-muted">
                No pending requests found.
              </p>
            )}
          </div>
        )}

        {/* ✅ APPROVED REQUESTS */}
        {activeTab === "Approved Request" && (
          <div className="approvedrequest mt-2">
            <h6 className="d-flex justify-content-between mt-2 mb-2 fw-bold">
              <span className="ms-3 flex-grow-2">Title</span>
              <span className="ms-3 flex-grow-1">Client</span>
              <span className="ms-3 flex-grow-1">Date Approved</span>
              <span className="me-3 flex-grow-1">Approved by</span>
            </h6>

            {approvedRequests.length > 0 ? (
              approvedRequests.map((req) => (
                <div key={req.id} className="pending_request_wrapper">
                  <div
                    className={`d-flex justify-content-between align-items-center py-2 px-3 pending_adminRequest ${
                      expandedId === req.id ? "active_row" : ""
                    }`}
                    onClick={() => handleRowClick(req.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{req.request_title}</span>
                    <span>{req.client_name || "N/A"}</span>
                    <span>
                      {req.request_date
                        ? new Date(req.request_date).toLocaleDateString()
                        : "—"}
                    </span>
                    <span>{req.approved_by || "—"}</span>
                  </div>

                  {expandedId === req.id && (
                    <div className="request_details bg-light p-3 border rounded mt-1 mx-3 request_choices">
                      <p className="mb-1">
                        <strong>Client Name:</strong> {req.client_name || "N/A"}
                      </p>
                      <p className="mb-1">
                        <strong>Description:</strong>{" "}
                        {req.request_description || "No details available."}
                      </p>
                      <p className="mb-0">
                        <strong>Status:</strong> {req.request_status}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-muted mt-3">
                No approved requests found.
              </p>
            )}
          </div>
        )}

        {/* ✅ DENIED REQUESTS */}
        {activeTab === "Denied Request" && (
          <div className="deniedrequest mt-2">
            <h6 className="d-flex justify-content-between mt-2 mb-2 fw-bold">
              <span className="ms-3 flex-grow-2">Title</span>
              <span className="ms-3 flex-grow-1">Client</span>
              <span className="ms-3 flex-grow-1">Date Denied</span>
              <span className="me-3 flex-grow-1">Denied By</span>
            </h6>
            {deniedRequests.length > 0 ? (
              deniedRequests.map((req) => (
                <div key={req.id} className="pending_request_wrapper">
                  <div
                    className="d-flex justify-content-between align-items-center py-2 px-3 pending_adminRequest"
                    onClick={() => handleRowClick(req.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{req.request_title}</span>
                    <span>{req.client_name || "N/A"}</span>
                    <span>
                      {req.request_date
                        ? new Date(req.request_date).toLocaleDateString()
                        : "—"}
                    </span>
                    <span>{req.denied_by || "—"}</span>
                  </div>

                  {expandedId === req.id && (
                    <div className="request_details bg-light p-3 border rounded mt-1 mx-3 request_choices">
                      <p className="mb-1">
                        <strong>Client Name:</strong> {req.client_name || "N/A"}
                      </p>
                      <p className="mb-1">
                        <strong>Description:</strong>{" "}
                        {req.request_description || "No details available."}
                      </p>
                      <p className="mb-0">
                        <strong>Status:</strong> {req.request_status}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-muted mt-3">
                No denied requests found.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default RequestPage;

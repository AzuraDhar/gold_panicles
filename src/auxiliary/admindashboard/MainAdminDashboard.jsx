import React, { useState } from "react";

import MainDashboardNav from "../nav/MainDashboardNav";

import DashboardPage from "./pages/DashboardPage";
import RequestPage from "./pages/RequestPage";
import AssignmentPage from "./pages/AssignmentPage";
import StaffPage from "./pages/StaffPage";
import CalendarPage from "./pages/CalendarPage";

import ClientCalendar from "./pages/client/ClientCalendar";
import ClientRequest from "./pages/client/ClientRequest";


function MainAdminDashboard(){

    const [selectedPage, setSelectedPage] = useState("Dashboard");

    const renderPage = () => {
        switch (selectedPage) {
        case "Dashboard":
            return <DashboardPage />;
        case "Request":
            return <RequestPage />;
        case "Assignment":
            return <AssignmentPage />;
        case "Calendar":
            return <CalendarPage />;
        case "Staff":
            return <StaffPage />;
        case "ClientCalendar":
            return <ClientCalendar />;
        case "ClientRequest":
            return <ClientRequest />;
        default:
            return <DashboardPage />;
        }
    };

    return(
        <>
            <div className="main_admin_body">
            <div className="main_admin_body_col1">
                <MainDashboardNav onMenuClick={setSelectedPage} selectedPage={selectedPage} />
            </div>

            <div className="main_admin_body_col2">
                {renderPage()}
            </div>
            </div>
        </>
    )
}

export default MainAdminDashboard;
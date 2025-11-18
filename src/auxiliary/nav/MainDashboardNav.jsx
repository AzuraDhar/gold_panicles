import React, { useState } from "react";

import tgp from '../../assets/image/tgplogo.png';
import dashlogo from '../../assets/image/nav.png';

import assignLogo from '../../assets/image/assignment.png';
import dashLogo2 from '../../assets/image/dashb.png';
import calendarLogo from '../../assets/image/calendar.png';
import requestLogo from '../../assets/image/request.png';
import staffLogo from '../../assets/image/staff.png';
import profileLogo from '../../assets/image/profle.jpg';


function MainDashboardNav({ onMenuClick, selectedPage, role}) {

    const adminMenu = [
                { name: "Dashboard", icon: dashLogo2 },
                { name: "Request", icon: requestLogo },
                { name: "Assignment", icon: assignLogo },
                { name: "Calendar", icon: calendarLogo, key: "AdminCalendar" },
                { name: "Staff", icon: staffLogo },
            ];

            // Menu items for Normal User
            const userMenu = [
                { name: "Calendar", icon: calendarLogo, key: "ClientCalendar" },
                { name: "My Requests", icon: requestLogo, key: "ClientRequest" },
            ];

  // Pick which menu to display
  const menuItems = role === "admin" ? userMenu : adminMenu;

    return(
        <>
            <div className="main_nav1">
                <div className="main_nav_logo">
                <img src={tgp} alt="Logo" />
                </div>

                <div className="main_nav_title">
                <p className="mt-2 gold_title"><strong>THE GOLD PANICLES</strong></p>
                </div>

                <div className="main_nav_dblogo ms-5">
                <img src={dashlogo} alt="Dashboard" />
                </div>
            </div>

            <div className="main_nav2">
                {menuItems.map((item, index) => (
                <span
                    key={index}
                    className={`nav_menu_item ${selectedPage === (item.key || item.name) ? "active" : ""}`}
                    onClick={() => onMenuClick(item.key || item.name)}
                >
                    <img src={item.icon} alt={item.name} className="menu_icon" />
                    <p className="menu_text">{item.name}</p>
                </span>
                ))}
            </div>

            <div className="main_nav3">
                <span>
                <img src={profileLogo} alt="User" />
                <p className="user_name mt-2">User</p>
                </span>
            </div>
        </>
    )
}

export default MainDashboardNav;
import React from "react";
import "../styles/LayoutStyles.css";
import { AdminMenu, UserMenu } from "../data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const SidebarMenu = user?.isAdmin ? AdminMenu : UserMenu;
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout successfully");
  };
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">DOC APP</div>
            <hr />
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={isActive ? "active" : "menu-item"}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Badge
                  count={user?.notification.length}
                  onClick={() => {
                    navigate("/getAllNotifications");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="fa-solid fa-bell"
                    onClick={() => {
                      navigate("/getAllNotifications");
                    }}
                    style={{ cursor: "pointer" }}
                  ></i>
                </Badge>
                <Link to="/profile">HI {user?.name}!</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

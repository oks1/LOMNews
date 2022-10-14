import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, logout, getMe } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export const Navigbar = () => {
  const date = new Date();
  const time = `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;

  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  /////////////////Roles
  //const { user } = useSelector((state) => state.auth);

  var allowedRole = "User";

  if (isAuth) {
    // allowedRole = user.role[0];
    console.log("user role ", allowedRole);
  } else allowedRole = "User";

  let ifEditor = false;
  if (allowedRole === "Editor") {
    ifEditor = true;
  }

  /////////////////////////////////////
  var userName = "";
  if (isAuth) {
    //  userName = user.name;
    console.log(userName);
  }

  const navigate = useNavigate();

  console.log("isAuth  " + isAuth);
  //highlight active link
  const activeStyles = {
    color: "black",
  };

  const adminPanelHandler = () => {
    navigate("/admin");
    // dispatch(logout());
    // window.localStorage.removeItem("token");
    // toast("You have been logged out");
  };
  const adminPanelHandlerInactive = () => {
    // navigate("/admin");
    // dispatch(logout());
    // window.localStorage.removeItem("token");
    toast("Please Log in");
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("You have been logged out");
  };
  return (
    <div class="container">
      <div class="top_ber">
        <div class="row">
          <div class="col-md-4">
            <div class="top_ber_left">
              {date.toDateString()}{" "}
              {time.toLocaleString(
                "en-US",
                { hour: "numeric", hour12: true },
                60000
              )}
            </div>
          </div>
          <div class="col-md-4 text-center">
            {isAuth ? `Welcome ${userName}` : <p></p>}
          </div>
          <div class="col-md-4">
            <div class="top_ber_right">
              <div class="top-menu">
                <ul class="nav navbar-nav flex-row ">
                  <li>
                    <NavLink
                      className="text-decoration-none"
                      to={"/"}
                      href="#"
                      style={({ isActive }) =>
                        isActive ? activeStyles : undefined
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  {ifEditor ? (
                    <li>
                      <NavLink
                        className="text-decoration-none"
                        to={"/new"}
                        href="#"
                        style={({ isActive }) =>
                          isActive ? activeStyles : undefined
                        }
                      >
                        Add News
                      </NavLink>
                    </li>
                  ) : (
                    <li></li>
                  )}

                  {ifEditor ? (
                    <li>
                      <NavLink
                        to={"/news/user/my"}
                        className="text-decoration-none"
                        href="#"
                        style={({ isActive }) =>
                          isActive ? activeStyles : undefined
                        }
                      >
                        My News
                      </NavLink>
                    </li>
                  ) : (
                    <li></li>
                  )}
                  <li>
                    {isAuth ? (
                      <NavLink
                        onClick={logoutHandler}
                        variant="primary"
                        className="text-decoration-none"
                      >
                        Logout
                      </NavLink>
                    ) : (
                      <NavLink className="text-decoration-none" to={"/login"}>
                        Login
                      </NavLink>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

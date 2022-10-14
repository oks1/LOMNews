import React, { useState, useEffect } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, checkIsAuth } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

//import "./Form.scss";

const initialValues = {
  email: "",
  password: "",
};

const validate = (values) => {
  let errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "Invalid Email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 7) {
    errors.password = "Password too short";
  }

  return errors;
};

const submitForm = (values) => {
  console.log(values);
};

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const data = useSelector((state) => state.auth);
  // const user = { data };
  //   console.log(`user object: `, user);
  // console.log("Role:" + JSON.stringify(data.user.role))

  const { status } = useSelector((state) => state.auth); //for toastify modal window

  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //console.log("status: " + status);
  // const { user } = useSelector((state) => state.auth);
  // const { token } = useSelector((state) => state.auth);
  // console.log("userinfo.role " + user + status);

  // console.log("Login.jsx status: " + status);

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate("/");
  }, [status, isAuth, navigate]);

  // console.log(data);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ email, password }));
      console.log(`email: `, email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <body>
      <Container className="d-flex">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
              isValid,
              dirty,
            } = formik;
            console.log(errors);
            return (
              <Form onSubmit={(e) => e.preventDefault()} className="mx-auto">
                <h1 className="text-lg  font-bold text-black text-center py-2">
                  Login
                </h1>
                <Row className="mb-6 py-2">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    //  onChange={(e) => setEmail(e.target.value)}
                    // onChange={(e) => {
                    //   setEmail(e.target.value);
                    //   handleChange();
                    // }}
                    onBlur={(e) => setEmail(e.target.value)}
                    className={errors.email ? "input-error" : null}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </Row>

                <Row className="mb-6 py-2">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    //onChange={(e) => setPassword(e.target.value)}
                    // onChange={(e) => {
                    //   setPassword(e.target.value);
                    //   handleChange();
                    // }}
                    onBlur={(e) => setPassword(e.target.value)}
                    className={errors.password ? "input-error" : null}
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </Row>
                <div className="flex gap-8 justify-center mt-4 ">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                    disabled={!(dirty && isValid)}
                  >
                    Login
                  </Button>
                  <Link
                    to="/register"
                    className="flex justify-center items-center  px-4 "
                  >
                    New to LOMNews? Sign Up
                  </Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Container>
      <div class="copyright-section footer_section section_wrapper section_wrapper ">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-7">
              <div class="copyright">
                © Copyright 2022 - LOMNEWS. Developed by: Liutsiia, Oxana,
                Myrzagul
              </div>
            </div>
            <div class="col-md-2"></div>
          </div>
        </div>
      </div>
    </body>
  );
};

//export default Login;

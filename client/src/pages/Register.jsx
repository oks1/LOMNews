import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, checkIsAuth } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";

import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatarURL: "",
};

const validate = (values) => {
  let errors = {};
  // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.name) {
    errors.name = "name is required";
  } else if (values.name.length < 3) {
    errors.name = "name too short";
  }

  //   if (!values.email) {
  //     errors.email = "email is required";
  //   } else if (values.email.length < 3) {
  //     errors.email = "email too short";
  //   }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "Invalid Email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password too short";
  }

  return errors;
};

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  const { status } = useSelector((state) => state.auth); //for toastify modal window

  const data = useSelector((state) => state.auth);
  const user = { data };
  console.log(`user object: `, user);

  console.log("status regist: " + status);
  const isAuth = useSelector(checkIsAuth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) navigate("/"); 
  }, [status, isAuth, navigate]);


  const handleSubmit = () => {
    try {
      dispatch(registerUser({ name, email, password, avatarURL }));
      //clean form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAvatarURL("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="d-flex mt-1 mb-3 pb-5">
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
              <h1 className="text-lg  font-bold text-black text-center py-2 pt-4">
                Registration
              </h1>
              <Row className="mb-2 py-1">
                <label className="px-2">*Name:</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={(e) => setName(e.target.value)}
                  placeholder="Name"
                  // className=" border py-1 px-2 "
                  className={errors.name ? "input-error" : null}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </Row>
              <Row className="mb-2 py-1">
                <label className="px-2">*Email:</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  // className=" border py-1 px-2 "
                  className={errors.email ? "input-error" : null}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </Row>
              <Row className="mb-2 py-1">
                <label className="px-2">*Password:</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  // className=" border py-1 px-2 "
                  className={errors.password ? "input-error" : null}
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </Row>
              {/* <Row className="mb-2 py-1">
                <label className="px-2">Confirm Password:</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  // className=" border py-1 px-2 "
                  className={errors.confirmPassword ? "input-error" : null}
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </Row> */}
              <Row className="mb-2 py-1">
                <label className="px-2">*Avatar:</label>
                <Field
                  type="text"
                  name="avatarURL"
                  id="avatarURL"
                  value={values.avatarURL}
                  onChange={handleChange}
                  onBlur={(e) => setAvatarURL(e.target.value)}
                  placeholder="Avatar"
                  // className=" border py-1 px-2 "
                  className={errors.avatarURL ? "input-error" : null}
                />
                {errors.avatarURL && (
                  <span className="error">{errors.avatarURL}</span>
                )}
              </Row>
              <div className="flex gap-8 justify-center mt-4">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className={!(dirty && isValid) ? "disabled-btn" : ""}
                  disabled={!(dirty && isValid)}
                >
                  Sign up
                </Button>
                <Link
                  to="/login"
                  className="flex justify-center items-center text-xs text-black font-bold py-2 px-4"
                >
                  Already signed up? Log in
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

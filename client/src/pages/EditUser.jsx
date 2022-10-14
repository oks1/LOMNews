import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../redux/features/admin/adminSlice";
import axios from "../utils/axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const EditUser = () => {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchUser = useCallback(async () => {
    const { data } = await axios.get(`/admin/edituser/${params.id}`);
    setRole(data.role);
    setStatus(data.status);
  }, [params.id]);

  const submitHandler = () => {
    try {
      console.log(role);
      console.log("status" + status);
      const updatedUser = new FormData();
      updatedUser.append("role", role);
      updatedUser.append("status", status);
      updatedUser.append("id", params.id);
      dispatch(updateUser(updatedUser));
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = () => {
    setRole("");
    setStatus("");
    navigate("/admin");
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <Form.Label className="text-xs ">
        Role:
        <Form.Control
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className=""
        />
      </Form.Label>
      <Form.Label className="text-xs ">
        Status:
        <Form.Control
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className=""
        />
      </Form.Label>
      <Button type="submit" onClick={submitHandler} className=" py-2 px-4">
        Update
      </Button>
      <Button type="cancel" onClick={clearFormHandler} className=" py-2 px-4">
        Cancel
      </Button>
    </Form>
  );
};

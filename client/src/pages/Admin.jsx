import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserItem } from "../components/UserItem";
import { getAllUsers, allUsers } from "../redux/features/admin/adminSlice";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import axios from "../utils/axios";

export const Admin = () => {
  //   const dispatch = useDispatch();
  //   const { users } = useSelector((state) => state.admin);

  //   //const { users } = useSelector(allUsers);

  //   useEffect(() => {
  //     dispatch(getAllUsers());
  //   }, [dispatch]);

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/auth/users");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //   const formEntries = Array.from(users.entries());
  //   console.log("formEntries ", formEntries);

  //   console.log("users admin all " + users);

  return (
    <Container>
      <h3 className="text-center">Users</h3>
      <div class="row"></div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((users, idx) => (
            <UserItem key={idx} users={users} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

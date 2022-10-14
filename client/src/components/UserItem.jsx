import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const UserItem = ({ users }) => {
  return (
    <tr>
      <td>{users._id}</td>
      <td>{users.name}</td>
      <td>{users.email}</td>
      <td>{users.role}</td>
      <td>{users.status}</td>
      <td>
        <NavLink
          to={`/admin/edituser/${users._id}`}
          href="#"
          type="button"
          // class="btn btn-light btn-small"
        >
          <AiFillEdit />
          Edit
        </NavLink>
        /
        <NavLink
          href="/admin/deleteuser"
          type="button"
          // class="btn btn-light btn-small"
        >
          <AiFillDelete /> Delete
        </NavLink>
      </td>
    </tr>
  );
};

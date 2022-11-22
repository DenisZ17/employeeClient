import React from "react";
import { useGetUserQuery } from "./../users/usersApiSlice";

const NoteUser = ({ idUser }: any) => {
  const { data } = useGetUserQuery(idUser);

  return <td className="table__cell note__username">{data?.username}</td>;
};

export default NoteUser;

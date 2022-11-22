import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { createEntityAdapter } from "@reduxjs/toolkit";

import { useGetNoteQuery } from "./notesApiSlice";
import NoteUser from "./NoteUser";

const Note = ({ noteId }: any) => {
  const { data } = useGetNoteQuery(noteId);
  //   const note = useSelector((state) => selectNoteById(state, noteId));

  const navigate = useNavigate();

  if (data) {
    const created = new Date().toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date().toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {data.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{data.title}</td>
        <NoteUser idUser={data.userId} />

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default Note;

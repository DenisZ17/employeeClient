import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { INote } from "../../types";

const EditNoteForm = ({ note, users }: any) => {
  const [updateNote, { isLoading, isSuccess }] = useUpdateNoteMutation();

  const [deleteNote, { isSuccess: isDelSuccess }] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const initialState: INote = {
    id: "",
    title: "",
    completed: false,
    text: "",
    userId: 6,
  };

  const [editNote, setEditNote] = useState(note);
  const { title, text, completed, userId } = editNote;

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setEditNote(initialState);
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handlerInput = (e: any) => {
    let { name, value } = e.target;
    setEditNote({ ...editNote, [name]: value });
  };

  const options = users.map((item: any) => {
    return (
      <option key={item.id} value={item.id}>
        {item.username}
      </option>
    );
  });
  const onSaveNoteClicked = async (e: any) => {
    e.preventDefault();
    await updateNote(editNote);
    setEditNote(initialState);
    navigate("/dash/notes");
  };

  const onDeleteNoteClicked = async () => {
    await deleteNote(note);
  };

  const canSave = [title, text, userId].every(Boolean) && !isLoading;
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  //const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      {/* <p className={errClass}>{errContent}</p> */}

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note #{note.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteNoteClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="note-title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={handlerInput}
        />

        <label className="form__label" htmlFor="note-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="note-text"
          name="text"
          value={text}
          onChange={handlerInput}
        />
        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="note-completed"
            >
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={(e: any) => {
                  setEditNote({ ...editNote, completed: !completed });
                }}
              />
            </label>

            <label
              className="form__label form__checkbox-container"
              htmlFor="note-username"
            >
              ASSIGNED TO:
            </label>
            <select
              id="note-username"
              name="username"
              className="form__select"
              value={userId}
              onChange={(e: any) => {
                setEditNote({ ...editNote, userId: e.target.value });
              }}
            >
              {options}
            </select>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};
export default EditNoteForm;

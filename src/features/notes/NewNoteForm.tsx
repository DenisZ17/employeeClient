import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { INote } from "../../types";

const NewNoteForm = ({ users }: any) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const initialState: INote = {
    id: "",
    title: "",
    completed: false,
    text: "",
    userId: 6,
  };

  const [editNote, setEditNote] = useState(initialState);
  const { title, text, completed, userId } = editNote;
  // const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setEditNote(initialState);
      navigate("/dash/notes");
    }
  }, [isSuccess, initialState, navigate]);

  const handlerInput = (e: any) => {
    let { name, value } = e.target;
    setEditNote({ ...editNote, [name]: value });
  };
  //   const onTextChanged = (e: any) => setText(e.target.value);
  //   const onUserIdChanged = (e: any) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e: any) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote(editNote);
    }
  };

  const options = users.map((user: any) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });

  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const content = (
    <>
      <form className="form" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
          <h2>New Note</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={handlerInput}
        />

        <label className="form__label" htmlFor="text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          value={text}
          onChange={handlerInput}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={userId}
          onChange={(e: any) => {
            setEditNote({ ...editNote, userId: e.target.value });
          }}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};

export default NewNoteForm;

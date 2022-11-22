import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { IUser } from "../../types";
//import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/;
const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const EditUserForm = ({ user }: any) => {
  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation();

  const [deleteUser, { isSuccess: isDelSuccess }] = useDeleteUserMutation();

  const navigate = useNavigate();
  const initialState: IUser = {
    id: "",
    email: "",
    username: "",
    password: "",
    roles: "",
    active: false,
  };

  const [editUser, setEditUser] = useState(user);
  const { username, email, password, roles, active } = editUser;

  const [validUsername, setValidUsername] = useState(false);

  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(editUser.username));
  }, [editUser]);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(editUser.email));
  }, [editUser]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setEditUser(initialState);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handlerInput = (e: any) => {
    let { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const onSaveUserClicked = async (e: any) => {
    await updateUser(editUser);
    setEditUser(initialState);
    navigate("/dash/users");
  };

  const onDeleteUserClicked = async () => {
    await deleteUser(user);
  };

  let canSave;
  if (password) {
    canSave = [validUsername].every(Boolean) && !isLoading;
  } else {
    canSave = [validUsername].every(Boolean) && !isLoading;
  }

  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validEmailClass = !validEmail ? "form__input--incomplete" : "";

  //const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      {/* <p className={errClass}>{errContent}</p> */}

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={handlerInput}
        />
        <label className="form__label" htmlFor="email">
          Email: <span className="nowrap">[required]</span>
        </label>
        <input
          className={`form__input ${validEmailClass}`}
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handlerInput}
        />

        {/* <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>{" "}
          <span className="nowrap">[4-70 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlerInput}
        /> */}

        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={() => {
              setEditUser({ ...editUser, active: !active });
            }}
          />
        </label>

        <label className="form__label" htmlFor="email">
          ROLES: <span className="nowrap">[required]</span>
        </label>
        <input
          className={`form__input ${validEmailClass}`}
          id="roles"
          name="roles"
          type="text"
          value={roles}
          onChange={handlerInput}
        />
      </form>
    </>
  );

  return content;
};
export default EditUserForm;

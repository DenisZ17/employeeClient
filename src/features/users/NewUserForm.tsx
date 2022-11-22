import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { IUser } from "../../types";

const ROLES = ["ADMIN", "USER"];

const USER_REGEX = /^[A-z]{3,20}$/;
const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const initialState: IUser = {
    id: "",
    username: "",
    email: "",
    password: "",
    active: false,
    roles: "USER",
  };
  const [user, setUser] = useState(initialState);
  const { username, id, password, email, active, roles } = user;
  const [changeActive, setChangeActive] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  const handlerInput = (e: any) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  useEffect(() => {
    if (isSuccess) {
      setUser(initialState);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const canSave =
    [validUsername, validEmail, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e: any) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser(user);
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";

  const content = (
    <>
      {/* <p className={errClass}>"Что-то пошло не так :("</p> */}

      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
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
        <label className="form__label" htmlFor="username">
          Email: <span className="nowrap">[required]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handlerInput}
        />
        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlerInput}
        />

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="roles"
          name="roles"
          type="text"
          value={roles}
          onChange={handlerInput}
        />
        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="active"
            type="checkbox"
            checked={changeActive}
            onChange={(e: any) => {
              setChangeActive(!changeActive);
              setUser({ ...user, active: e.target.checked });
            }}
          />
        </label>
      </form>
    </>
  );

  return content;
};
export default NewUserForm;

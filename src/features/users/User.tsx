import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useGetUserQuery } from "./usersApiSlice";
import { IUser } from "../../types";

const User = ({ userId }: any) => {
  const { data } = useGetUserQuery(userId);
  // const user = useSelector(state => selectUserById(state, userId))

  const navigate = useNavigate();

  if (data) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = data?.roles;

    const cellStatus = data.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{data.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default User;

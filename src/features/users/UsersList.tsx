import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content: any;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) {
    content = (
      <p className={isError ? "errmsg" : "offscreen"}>What is wrond (;</p>
    );
  }

  if (isSuccess) {
    const tableContent = users?.length
      ? users.map((user) => <User key={user.id} userId={user.id} />)
      : null;

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return content;
};

export default UsersList;

import { useParams } from "react-router-dom";

import { useGetUserQuery } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  const { data, isError, isLoading } = useGetUserQuery(id!);
  isError && console.log("Что-то не так (");

  data && console.log(data);

  const content = data ? <EditUserForm user={data} /> : <p>Loading...</p>;

  return content;
};
export default EditUser;

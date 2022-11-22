import { useParams } from "react-router-dom";

import { useGetNoteQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "./../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";

const EditNote = () => {
  const { id } = useParams();

  const { data: users } = useGetUsersQuery();

  const { data, isError } = useGetNoteQuery(id!);
  isError && console.log("Что-то не так (");

  data && console.log(data);

  const content =
    data && users ? (
      <EditNoteForm note={data} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};
export default EditNote;

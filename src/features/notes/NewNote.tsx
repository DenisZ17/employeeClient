import { useGetUsersQuery } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  const { data: users } = useGetUsersQuery();

  if (!users?.length) return <p>Not Currently Available</p>;

  const content = <NewNoteForm users={users} />;

  return content;
};
export default NewNote;

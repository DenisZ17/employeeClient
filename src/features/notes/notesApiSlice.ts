import { apiSlice } from "../../app/api/apiSlice";
import { INote } from "../../types";

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<INote[], void>({
      query: () => "/notes",

      providesTags: ["Note"],
    }),
    getNote: builder.query<INote, string>({
      query: (id) => `/notes/${id}`,
      providesTags: ["Note"],
    }),
    addNewNote: builder.mutation<void, INote>({
      query: (initialNoteData) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNoteData,
        },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation<void, INote>({
      query: (initialNoteData) => ({
        url: `/notes/${initialNoteData.id}`,
        method: "PUT",
        body: initialNoteData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation<void, INote>({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useAddNewNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} = notesApiSlice;

// returns the query result object
// export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// // creates memoized selector
// const selectUsersData = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult.data // normalized state object with ids & entities
// );

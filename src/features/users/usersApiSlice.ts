import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { IUser } from "../../types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "/users",

      providesTags: ["User"],
    }),
    getUser: builder.query<IUser, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    addNewUser: builder.mutation<void, IUser>({
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation<void, IUser>({
      query: ({ id, ...initialUserData }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: initialUserData,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, IUser>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

// export const {
//   selectAll: selectAllUsers,
//   selectByID: selectUserById,
//   selectIds: selectUserIds
// }

import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { get } from "lodash";
import { Axios } from "axios";
import { AuthenticationError } from "../utils/error/error";
const createSliceWithThunk = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  active: true,
  loading: false,
  data: "",
};

const userSlice = createSliceWithThunk({
  name: "user",
  initialState,
  reducers: (create) => ({
    init: (state, action) => {
      state.active = true;
      state.data = action.payload.data;
    },
    getCurrentUser: create.asyncThunk(
      async (userData, thunkAPI) => {
        try {
          let data = await Axios.get("");
          if (data?.status !== 200) {
            throw new AuthenticationError(data.response.data.error.message, {
              statusCode: data.status,
            });
          }
        } catch (err) {
          const message = get(err, "message", "Something Went Wrong!");
          const name = get(err, "name", "Error!");
          const statusCode = get(err, "metadata.statusCode", "");
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.loading = false;
          state.toastMessage = {
            type: "danger",
            content: action?.payload?.message,
          };
        },
        fulfilled: (state, action) => {
          state.userId = action?.payload?.data?.response?.data?.userId;
          state.loading = false;
        },
      }
    ),
  }),
});

export const { init, getCurrentUser } = userSlice.actions;

export default userSlice.reducer();

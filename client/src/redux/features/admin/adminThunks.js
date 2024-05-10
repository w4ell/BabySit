import axios from "axios";
import { adminActions } from "./adminSlice"; // Import action creators
import { server } from "../../../static/data";
export const loginAdmin = (email, password) => async (dispatch) => {
  dispatch(adminActions.LoginAdminRequest()); // Dispatch the request action

  try {
    const response = await axios.post(
      `${server}/admin/admin-login`,
      { email, password },
      { withCredentials: true }
    );
    dispatch(adminActions.LoginAdminSuccess(response.data.admin));
    window.location.reload();
  } catch (error) {
    dispatch(adminActions.LoginAdminFailure(error.message));
  }
};

export const loadAdmin = () => async (dispatch) => {
  try {
    dispatch(adminActions.LoadAdminRequest());
    const { data } = await axios.get(`${server}/admin/getadmin`, {
      withCredentials: true,
    });

    // Dispatch LoadAdminSuccess with the retrieved admin data
    dispatch(adminActions.LoadAdminSuccess(data.admin));
  } catch (error) {
    // Dispatch LoadAdminFail with the error message
    dispatch(adminActions.LoadAdminFail(error.message));
  }
};

export const logoutAdmin = () => async (dispatch) => {
  try {
    dispatch(adminActions.LogoutAdminRequest());
    const response = await axios.get(`${server}/admin/admin-logout`, {
      withCredentials: true,
    });
    dispatch(adminActions.LogoutAdminSuccess(response.data.message));
    window.location.reload();
  } catch (error) {
    dispatch(adminActions.LogoutAdminFail(error.message));
  }
};

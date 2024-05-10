import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "..";
import { useStateContext } from "../../../context/ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import { RiUserSettingsFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { logoutAdmin } from "../../../redux/features/admin/adminThunks";
import { Link } from "react-router-dom";

const AdminProfile = () => {
  const { currentColor } = useStateContext();
  const admin = useSelector((state) => state.admin.currentAdmin);
  const loading = useSelector((state) => state.admin.loading);
  const dispatch = useDispatch();
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          Admin Profile
        </p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <CgProfile size={35} color={currentColor} />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {admin?.name}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {admin?.email}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
          <button
            type="button"
            className=" text-3xl rounded-lg p-3 hover:bg-light-gray"
          >
            <RiUserSettingsFill color={currentColor} />
          </button>

          <div>
            <p className="font-semibold dark:text-gray-200 ">My Profile</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              Account Settings
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <button
          type="button"
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
          }}
          className="p-3 w-full hover:drop-shadow-xl"
          disabled={loading}
          onClick={() => dispatch(logoutAdmin())}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;

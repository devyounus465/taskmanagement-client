import { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className=" flex flex-wrap md:flex-nowrap ">
      {/* dashboard sidebar */}
      <div className=" w-screen md:w-64 p-6 shrink-0 bg-gray-900 text-white h-screen">
        {/* user ifo */}
        <div className="text-center ">
          <img
            className="rounded-full w-32 h-32 mx-auto"
            src={user?.photoURL}
            alt=""
          />
          <div className="mt-2">
            <h3 className="text-xl font-semibold">{user?.displayName}</h3>
            <h4 className="text-md font-normal">{user.email}</h4>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
        <div>
          <ul className="menu">
            <li className="mb-2">
              <NavLink
                className={"bg-gray-500 hover:bg-pink-500"}
                to={"/dashboard"}
              >
                Over View
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                className={"bg-gray-500 hover:bg-pink-500"}
                to={"/dashboard/create-task"}
              >
                Create New Task
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink className={"bg-gray-500 hover:bg-pink-500"} to={"/"}>
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;

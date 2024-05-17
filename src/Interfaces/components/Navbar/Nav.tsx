import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuthService from "../../services/AuthService";

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [change, setChange] = useState(false);

  const { handleLogout, handleLogoutAdmin } = useAuthService();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const adminString = localStorage.getItem("admin");
  const admin = adminString ? JSON.parse(adminString) : null;

  useEffect(() => {}, [change]);

  const userItems = [
    {
      label: <NavLink to="/user">Profile</NavLink>,
      key: "1",
    },
    {
      label: <h1 onClick={handleLogout}>Logout</h1>,
      key: "2",
    },
  ];

  const adminItems = [
    {
      label: <NavLink to="/user">Profile</NavLink>,
      key: "1",
    },
    {
      label: <NavLink to="/dashboard">Dashboard</NavLink>,
      key: "2",
    },
    {
      label: <NavLink to="/campaignsManagement">Manage Campaigns</NavLink>,
      key: "3",
    },
    {
      label: <h1 onClick={handleLogoutAdmin}>Logout</h1>,
      key: "4",
    },
  ];

  const items = user ? userItems : adminItems;

  return (
    <div className="bg-primaryColor-900">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <NavLink
            to="/"
            aria-label="Vote.Wave"
            title="Vote.Wave"
            className="inline-flex items-center"
          >
            <img src="/Images/VoteWaveT.png" alt="Vote.Wave" width="160px" />
          </NavLink>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <NavLink
                to="/"
                aria-label="Home"
                title="Home"
                className="hover:underline font-bold me-4 md:me-6 tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/campaigns"
                aria-label="Campaigns"
                title="Campaigns"
                className="hover:underline font-bold me-4 md:me-6 tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
              >
                Campaigns
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/result"
                aria-label="Result"
                title="Result"
                className="hover:underline font-bold me-4 md:me-6 tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
              >
                Result
              </NavLink>
            </li>
          </ul>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            {!user && !admin ? (
              <>
                <li>
                  <Link
                    to="/login/user"
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
                    aria-label="Login"
                    title="Login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup/user"
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
                    aria-label="Sign up"
                    title="Sign up"
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <div>
                    <Dropdown
                      className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
                      menu={{ items }}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <div className="flex items-center space-x-1 hover:text-white cursor-pointer">
                            <img
                              className="rounded-full border-white"
                              src={user ? user.image : admin.image}
                              alt="Image"
                              width="38px"
                            />
                            <b>{user ? user.firstName : admin.firstName}</b>
                          </div>
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                </li>
              </>
            )}
          </ul>
          <div className="lg:hidden z-20">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-alphaColor-900" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full z-20">
                <div className="p-5 bg-primaryColor-900 border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <NavLink
                        to="/"
                        aria-label="Vote.Wave"
                        title="Vote.Wave"
                        className="inline-flex items-center"
                      >
                        <img
                          src="/Images/VoteWaveT.png"
                          alt="Vote.Wave"
                          width="160px"
                        />
                      </NavLink>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-alphaColor-900" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                          />
                          <path
                            fill="currentColor"
                            d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                          />
                          <path
                            fill="currentColor"
                            d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <NavLink
                          to="/"
                          aria-label="Home"
                          title="Home"
                          className="hover:underline font-bold tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                        >
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/campaigns"
                          aria-label="Campaigns"
                          title="Campaigns"
                          className="hover:underline font-bold tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                        >
                          Campaigns
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/result"
                          aria-label="Result"
                          title="Result"
                          className="hover:underline font-bold tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                        >
                          Result
                        </NavLink>
                      </li>
                      {!user && !admin ? (
                        <>
                          <li>
                            <Link
                              to="/login/user"
                              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
                              aria-label="Login"
                              title="Login"
                            >
                              Login
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/signup/user"
                              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
                              aria-label="Sign up"
                              title="Sign up"
                            >
                              Signup
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <div>
                              <Dropdown
                                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-secondaryColor-900 hover:bg-secondaryColor-800 focus:shadow-outline focus:outline-none"
                                menu={{ items }}
                              >
                                <a onClick={(e) => e.preventDefault()}>
                                  <Space>
                                    <div className="flex items-center space-x-1 hover:text-white cursor-pointer">
                                      <img
                                        className="rounded-full border-white"
                                        src={user ? user.image : admin.image}
                                        alt="Image"
                                        width="38px"
                                      />
                                      <b>{user ? user.firstName : admin.firstName}</b>
                                    </div>
                                    <DownOutlined />
                                  </Space>
                                </a>
                              </Dropdown>
                            </div>
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

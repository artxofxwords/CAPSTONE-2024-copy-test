import { Drawer, Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";

export default function AllUsersDrawer({ userInfo }) {
  const yourJwtToken = localStorage.getItem("jwtToken");
  const userData = userInfo;

  let usersError;
  let thisUserIsAdmin;

  const [isOpen, setIsOpen] = useState(false); //for user info drawer
  const [allUsers, setAllUsers] = useState([]); //list of all users for admin only
  const [viewUser, setViewUser] = useState(false); //show or hide view user modal
  const [deleteUser, setDeleteUser] = useState(false); //show or hide delete user confirmation modal
  const [thisUser, setThisUser] = useState([]); //this selected user from map method

  useEffect(() => {
    getAllUsers(); //stays on top of changing users list
  }, []);

  //fetches all registered users
  async function getAllUsers() {
    const response = await fetch(`http://localhost:3000/users/getAll`);

    const data = await response.json();

    if (response.status === 500) {
      usersError = <p className="text-red-600">Error: Could not get users!</p>;
    }

    console.log("all users fetched:", data);
    setAllUsers(data);
  }

  //handles admin click to open drawer with user info
  function handleClose() {
    setIsOpen(false);
  }

  //VIEW USER functionality
  function setViewUserBoolean(e, user) {
    e.preventDefault();
    const userClicked = user;

    setViewUser(true);
    setThisUser(userClicked);
  }

  //DELETE USER functionality
  function setDeleteUserBoolean(e, user) {
    e.preventDefault();
    const userClicked = user;

    setDeleteUser(!deleteUser);
    setThisUser(userClicked);
  }

  if (thisUser.isAdmin) {
    thisUserIsAdmin = <p>User is admin.</p>
  } else {
    thisUserIsAdmin = <p>User is not admin.</p>
  }

  async function handleDeleteUser(e) {
    e.preventDefault();
    const _id = thisUser._id;

    const body = {
      _id: userData._id,
      isAdmin: userData.isAdmin,
    };

    const response = await fetch(
      `http://localhost:3000/users/${_id}`,
      {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: {yourJwtToken}
        },
      }
    );

    const data = await response.json();
    console.log("Deleted user status: ", data);

    getAllUsers();
  }

  return (
    <>
      <Button className="bg-red-500" onClick={() => setIsOpen(true)}>
        See All Registered Users
      </Button>

      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Registered Users" />
        <Drawer.Items>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Current Registered Users
          </p>
          <ul className="w-98 text-med font-bold text-gray-900 bg-white border border-gray-200 rounded-lg">
            {allUsers?.map((user) => (
              <li
                key={user._id}
                className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
              >
                <span className="inline-flex w-3 h-3 me-3 bg-yellow-300 rounded-full"></span>
                <a href="#">
                  {user.firstName} {user.lastName}
                </a>
                <div
                  style={{
                    display: "inline-flex",
                    flexDirection: "row",
                    columnGap: "2px",
                    float: "right",
                  }}
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      setViewUserBoolean(e, user);
                    }}
                  >
                    <svg
                      className="inline w-6 h-6 text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      setDeleteUserBoolean(e, user);
                    }}
                  >
                    <svg
                      className="inline w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12h4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </a>
                  {viewUser && (
                    <div>
                      <Modal show={viewUser} onClose={() => setViewUser(false)}>
                        <Modal.Header>
                          {thisUser.firstName} {thisUser.lastName}
                        </Modal.Header>
                        <Modal.Body>
                          <div className="space-y-6">
                            <p>Username {thisUser.username}</p>
                            <p>Email {thisUser.email}</p>
                            <p>City {thisUser.city}</p>
                            <p>State {thisUser.state}</p>
                            <p>Company {thisUser.companyName}</p>
                            {thisUserIsAdmin}
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
                  )}

                  {deleteUser && (
                    <div>
                      <Modal
                        show={deleteUser}
                        onClose={() => setDeleteUser(false)}
                      >
                        <Modal.Header>Confirm User Deletion</Modal.Header>
                        <Modal.Body>
                          <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500">
                              Are you sure you want to delete {user.firstName}{" "}
                              {user.lastName}?
                            </p>
                            <p className="text-base leading-relaxed text-gray-500">
                              Action cannot be undone. This will delete the user
                              completely from the database.
                            </p>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            className="bg-red-500"
                            onClick={(e) => {
                              setDeleteUser(false), handleDeleteUser(e);
                            }}
                          >
                            Yes, I&apos;m sure. Delete user.
                          </Button>
                          <Button
                            color="gray"
                            onClick={() => {
                              setDeleteUser(false);
                            }}
                          >
                            No, cancel deletion.
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {usersError}
        </Drawer.Items>
      </Drawer>
    </>
  );
}

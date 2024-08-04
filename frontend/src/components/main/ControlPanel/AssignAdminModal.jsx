import { Modal, Button } from "flowbite-react";
import { useState, useEffect } from "react";

let usersError;

export default function AssignAdminModal() {
  const yourJwtToken = localStorage.getItem("jwtToken");

  const [showUserList, setShowUserList] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

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

  async function setThisAdmin(e, user) {
    e.preventDefault();

    const thisUser = user;
    console.log("this user", thisUser);

    if (thisUser.isAdmin) {
      const _id = thisUser._id;
      const body = { isAdmin: false };
      console.log("token:", yourJwtToken);

      const response = await fetch(`http://localhost:3000/users/${_id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: yourJwtToken,
        },
      });

      const data = await response.json();
      console.log("User admin access removed:", data);

      getAllUsers();
    } else {
      const _id = thisUser._id;
      const body = { isAdmin: true };
      console.log("token", yourJwtToken);

      const response = await fetch(`http://localhost:3000/users/${_id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: yourJwtToken,
        },
      });

      const data = await response.json();
      console.log("User admin access granted:", data);

      getAllUsers();
    }
  }

  return (
    <>
      <Button
        size="xs"
        style={{
          display: "inline-flex",
          backgroundColor: "#1b3b50",
          color: "#ddd5d0",
          borderRadius: "8px",
          padding: "3px",
          marginTop: "3px",
        }}
        type="click"
        onClick={() => {
          setShowUserList(true);
        }}
        className="focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
      >
        Assign Admin Status
      </Button>
      {showUserList && (
        <Modal
          show={showUserList}
          onClose={() => {
            setShowUserList(false);
          }}
        >
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <ul className="w-98 text-med font-bold text-gray-900 bg-white border border-gray-200 rounded-lg">
              {usersError}
              {allUsers?.map((user) => (
                <li
                  key={user._id}
                  className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                >
                  <a href="#">
                    {user.firstName} {user.lastName}{" "}
                    {user.isAdmin && (
                      <span className="text-pink-400">
                        <i>Admin</i>
                      </span>
                    )}
                  </a>

                  <div
                    style={{
                      display: "inline-flex",
                      flexDirection: "row",
                      columnGap: "2px",
                      float: "right",
                    }}
                  >
                    {user.isAdmin && (
                      <a
                        href="#"
                        onClick={(e) => {
                          setThisAdmin(e, user);
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
                            d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                          />
                        </svg>
                      </a>
                    )}

                    {!user.isAdmin && (
                      <a
                        href="#"
                        onClick={(e) => {
                          setThisAdmin(e, user);
                        }}
                      >
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
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
                            strokeWidth="2"
                            d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

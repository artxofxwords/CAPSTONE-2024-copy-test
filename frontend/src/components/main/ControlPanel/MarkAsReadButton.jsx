/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { jwtDecode } from "jwt-decode";

export default function MarkAsReadButton({ currentProposal, getAllProposals }) {
  const yourJwtToken = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(yourJwtToken);

  const currentProposalObject = currentProposal;

  const [userInfo, setUserInfo] = useState([]); //userInfo that persists
  const [readProposal, setReadProposal] = useState(false); //mark proposal as read once reviewed

  useEffect(() => {
    setPersistingCurrentUserObject(); //user info persists with refresh
  }, []);

  async function setPersistingCurrentUserObject() {
    const response = await fetch(`http://localhost:3000/users/${decoded._id}`);

    const data = await response.json();
    console.log("Persistent user data:", data);

    setUserInfo(data);
  }

  //handles user click on mark proposal as read
  async function handleMarkAsReadProposal(e) {
    e.preventDefault();

    let body;

    if (readProposal) {
      body = {
        _id: userInfo._id,
        isAdmin: userInfo.isAdmin,
        read: false,
      };
    } else {
      body = {
        _id: userInfo._id,
        isAdmin: userInfo.isAdmin,
        read: true,
      };
    }

    const response = await fetch(
      `http://localhost:3000/proposals/updateProposal/${currentProposalObject._id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: yourJwtToken,
        },
      }
    );

    const data = await response.json();

    setReadProposal(!readProposal);
    console.log("Proposal read status updated.", data);

    getAllProposals();
  }

  return (
    <div>
      {!readProposal && (
        <div>
        <Button
          type="click"
          style={{
            display: "inline-flex",
            marginLeft: "25px",
            backgroundColor: "transparent",
            color: "black",
          }}
          onClick={(e) => {
            handleMarkAsReadProposal(e);
          }}
        >
          <svg
            className="inline-flex w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#ddd5d0"
              strokeLinecap="round"
              strokeWidth="2"
              d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
            />
          </svg>
          Mark As Read
        </Button>
        </div>
      )}

      {readProposal && (
        <div>
        <Button
          type="click"
          style={{
            display: "inline-flex",
            marginLeft: "25px",
            backgroundColor: "transparent",
            color: "black",
          }}
          onClick={(e) => {
            handleMarkAsReadProposal(e);
          }}
        >
          <svg
            className="inline-flex w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#ddd5d0"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"
            />
          </svg>
          Mark As Unread
        </Button>
        </div>
      )}
    </div>
  );
}

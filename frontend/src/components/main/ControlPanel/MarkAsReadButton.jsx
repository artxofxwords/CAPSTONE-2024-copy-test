import { useState, useContext } from "react";
import CTX from '../Context';

export default function MarkAsReadButton({ currentProposal, getAllProposals }) {
  const CONTEXT = useContext(CTX);
  const yourJwtToken = localStorage.getItem("jwtToken");

  const currentProposalObject = currentProposal;
  let readIcon;

  const [readProposal, setReadProposal] = useState(false); //mark proposal as read once reviewed

  //set button for current proposal with closed/open envelope icon to 'mark as read/unread'
  if (readProposal === false) {
    readIcon = (
      <button
        type="click"
        style={{
          marginLeft: "25px",
        }}
        onClick={(e) => {
          handleMarkAsReadProposal(e);
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
            stroke="orange"
            strokeLinecap="round"
            strokeWidth="2"
            d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
          />
        </svg>
        Mark As Read
      </button>
    );
  } else {
    readIcon = (
      <button
        type="click"
        style={{
          marginLeft: "25px",
        }}
        onClick={(e) => {
          handleMarkAsReadProposal(e);
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
            stroke="orange"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"
          />
        </svg>
        Mark As Unread
      </button>
    );
  }

  //handles user click on mark proposal as read
  async function handleMarkAsReadProposal(e) {
    e.preventDefault();

    let body;

    if (readProposal) {
      body = {
        _id: CONTEXT.userData.user._id,
        isAdmin: CONTEXT.userData.user.isAdmin,
        read: false,
      };
    } else {
      body = {
        _id: CONTEXT.userData.user._id,
        isAdmin: CONTEXT.userData.user.isAdmin,
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
          Authorization: {yourJwtToken},
        },
      }
    );

    const data = await response.json();

    setReadProposal(!readProposal);
    console.log("Proposal marked as read.", data);

    getAllProposals();
  }

  return <div>{readIcon}</div>;
}

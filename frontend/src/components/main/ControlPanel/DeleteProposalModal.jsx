/* eslint-disable react/prop-types */
import { Modal, Button } from "flowbite-react";

export default function DeleteProposalModal({
  userInfo,
  currentProposal,
  setCurrentProposal,
  deleteProposal,
  setDeleteProposal,
  getAllProposals,
}) {
  const yourJwtToken = localStorage.getItem("jwtToken");

  //admin clicks on delete button for current proposal
  function handleClickProposalDelete(e) {
    e.preventDefault();

    setDeleteProposal(!deleteProposal);
  }

  //handles admin saving all state variables to database
  async function handleDeleteProposal(e) {
    e.preventDefault();

    const body = {
      _id: userInfo._id,
      isAdmin: userInfo.isAdmin,
    };

    const response = await fetch(
      `http://localhost:3000/proposals/deleteProposal/${currentProposal._id}`,
      {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: yourJwtToken,
        },
      }
    );

    const data = await response.json();
    console.log("deleted proposal status: ", data);

    setDeleteProposal(!deleteProposal);
    setCurrentProposal(null);
    getAllProposals();
  }

  return (
    <>
    {!deleteProposal && (
      (
        <Button
          type="click"
          style={{
            display: "inline-flex",
            marginLeft: "10px",
            backgroundColor: "transparent",
            color: "black"
          }}
          onClick={(e) => {
            handleClickProposalDelete(e);
          }}
        >
          <svg
            className="inline-flex w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#ff532f"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
              clipRule="evenodd"
            />
          </svg>
          Delete Proposal
        </Button>
      )
    )}

    {deleteProposal && (
      <div>
      <Modal show={deleteProposal} onClose={() => setDeleteProposal(false)}>
        <Modal.Header>Confirm Proposal Deletion</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500">
              Are you sure you want to delete this{" "}
              {currentProposal.companyName} proposal?
            </p>
            <p className="text-base leading-relaxed text-gray-500">
              Action cannot be undone. This will delete the proposal
              completely from the database.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-red-500"
            onClick={(e) => {
              handleDeleteProposal(e);
            }}
          >
            Yes, I&apos;m sure. Delete proposal.
          </Button>
          <Button
            color="gray"
            onClick={(e) => {
              handleClickProposalDelete(e);
            }}
          >
            No, cancel deletion.
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    )}
    </>
  )
}

import NewProposalForm from "../../../modals/NewProposalForm";
import { Modal, Button } from "flowbite-react";
import { useState } from "react";

export default function ViewProposalFormModal() {
  const [showProposal, setShowProposal] = useState(false);

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
          setShowProposal(true);
        }}
        className="focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
      >
        See Proposal Form
      </Button>
      <Modal
        show={showProposal}
        onClose={() => {
          setShowProposal(false);
        }}
      >
        <Modal.Header>New Proposal Submission Form</Modal.Header>
        <Modal.Body>
          <NewProposalForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

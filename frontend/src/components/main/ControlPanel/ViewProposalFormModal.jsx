import NewProposalForm from "../../../modals/NewProposalForm";
import {Modal, Button} from 'flowbite-react';
import {useState} from 'react';

export default function ViewOnlyProposalFormModal () {
    const [showProposal, setShowProposal] = useState(false);

    return (
        <>
        <Button
            className="bg-red-500"
            type="click"
            onClick={() => {
              setShowProposal(true)
            }}
          >
            See Proposal Form
          </Button>
        <Modal show={showProposal} onClose={() => {setShowProposal(false)}}>
            <Modal.Header>
            New Proposal Submission Form
            </Modal.Header>
            <Modal.Body>
                <NewProposalForm />
            </Modal.Body>
        </Modal>
        </>
    )
}
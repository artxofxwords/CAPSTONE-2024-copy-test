/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Button } from "flowbite-react";

export default function AllProposalsModal({
  allProposals,
  handleProposalClick
}) {
  const allProposalsFound = allProposals;

  const [viewProposals, setViewProposals] = useState(false);

  return (
    <>
      <Button
        className="bg-red-500"
        type="click"
        onClick={() => {
          setViewProposals(true);
        }}
      >
        See All Proposals
      </Button>
      <Modal show={viewProposals} onClose={() => setViewProposals(false)}>
        <Modal.Header>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            All Proposals
          </h5>
        </Modal.Header>
        <Modal.Body>
          <ul className="w-98 text-med font-bold text-gray-900 bg-white border border-gray-200 rounded-lg">
            {allProposalsFound?.map((proposal) => (
              <li
                key={proposal._id}
                onClick={(e) => {
                  setViewProposals(false), handleProposalClick(e, proposal);
                }}
                className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
              >
                <span className="inline-flex w-3 h-3 me-3 bg-yellow-300 rounded-full"></span>
                <a href="#">{proposal.companyName}</a>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
}

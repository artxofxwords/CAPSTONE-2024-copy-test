/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import EditProposalForm from "../../modals/EditProposalForm";

export default function ProposalStatus() {
  const [state, setState] = useState(null);
  const [thisProposal, setThisProposal] = useState();
  const [updateProposal, setUpdateProposal] = useState(false);

  const owner = localStorage.getItem("userInfo");

  useEffect(() => {
    if (!state) {
      getUserProposal();
    }
  }, []);

  async function getUserProposal() {
    const response = await fetch(
      `http://localhost:3000/proposals/displayUserProposal/${owner}`
    );

    const data = await response.json();
    console.log("data", data);
    setState(data);
  }

  return (
    <div style={{display: "flex", flexDirection: "row", columnGap:"5px", textAlign: "left", marginTop: "4vh"}}>
      <ul>
        {state?.map((proposal) => {
          return (
            <li key={proposal._id} style={{display: "flex", marginBottom: "8px"}}>
              <p style={{marginRight: "auto"}}><b>{proposal.companyName}</b> : &quot;{proposal.status}&quot; </p>
              
              <div style={{marginLeft:"auto"}}>
              <Button size="xs" type="click"
              onClick={() => {setThisProposal(proposal), setUpdateProposal(true)}}
              style={{
                display: "inline-flex",
                backgroundColor: "#ff532f",
                color: "black"
              }}
              className="focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
              Edit
              </Button>
              </div>
            </li>
          );
        })}
      </ul>

      {updateProposal && (
        <EditProposalForm thisProposal={thisProposal} updateProposal={updateProposal} setUpdateProposal={setUpdateProposal} />
      )}
      <div></div>
    </div>
  );
}

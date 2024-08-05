/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export default function proposalStatus() {
  const [state, setState] = useState(null);

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
    <div style={{textAlign: "left", marginTop: "4vh"}}>
      <ul>
        {state?.map((proposal) => {
          return (
            <li key={proposal._id} style={{marginBottom: "8px"}}>
              <b>{proposal.companyName}</b> : Proposal marked as <u>&quot;{proposal.status}&quot;</u> 
            </li>
          );
        })}
      </ul>
      <div></div>
    </div>
  );
}

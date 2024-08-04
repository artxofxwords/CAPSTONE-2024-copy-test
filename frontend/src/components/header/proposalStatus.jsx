import { useState, useEffect } from "react";

export default function proposalStatus() {
const [state, setState] = useState(null);

const owner = localStorage.getItem("userInfo");
console.log("owner", owner);

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
    <div>
    <ul>
        {state?.map((proposal) => {
        return (
            <li key={proposal._id}>
            {proposal.submittedStatus ? (
                <p
                style={{
                    textAlign: "center",
                    marginTop: "1%"
                }}>Your proposal has been submitted</p>
            ) : proposal.underReviewStatus ? (
                <p
                style={{
                    textAlign: "center",
                    marginTop: "1%"
                }}>Your proposal is under review</p>
            ) : proposal.ongoingStatus ? (
                <p
                style={{
                    textAlign: "center",
                    marginTop: "1%"
                }}>Your proposal is ongoing</p>
            ) : proposal.approvedStatus ? (
                <p
                style={{
                    textAlign: "center",
                    marginTop: "1%"
                }}>Your proposal is APPROVED!</p>
            ) : proposal.deniedStatus ? (
                <p
                style={{
                    textAlign: "center",
                    marginTop: "1%"
                }}>Your proposal has been DENIED!</p>
            ) : null}
            </li>
        );
        })}
    </ul>
    <div></div>
    </div>
);
}

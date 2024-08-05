// import { useNavigate } from "react-router-dom";
import Nav from "../header/Nav";
import NewProposalForm from "../../modals/NewProposalForm";
import ProposalStatus from "../header/proposalStatus";

export default function Proposal() {
  return (
    <>
      <Nav />

      <div style={{ display: "flex", flexDirection: "row"}}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "60vw" }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "2em",
            }}
          >
            Fill out the form to submit a proposal
          </h1>

          <NewProposalForm />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "40vw",
          }}
        >
          <h1
            style={{
              fontSize: "2em"
            }}
          >
            View the status of your proposal(s)
          </h1>

          <ProposalStatus />
        </div>
      </div>
    </>
  );
}

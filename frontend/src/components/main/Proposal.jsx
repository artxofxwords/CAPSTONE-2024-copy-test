import { useNavigate } from "react-router-dom";
import { useContext } from "react"
import Nav from "../header/Nav";
import NewProposalForm from "../../modals/NewProposalForm";
import CTX from "../header/Context";
import ProposalStatus from "../header/proposalStatus";

export default function Proposal() {
    const navigate = useNavigate();
    const CONTEXT = useContext(CTX);

    return (
        <>
        <Nav />

        <h1 style={{
            textAlign: "center",
            fontSize: "250%"
        }}>
            Please Fill out the form to submit a proposal!
        </h1>
        <div
                style={{
                }}>

        </div>
        <NewProposalForm />
        <div
        style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center"
        }}>
            Click the button below to show your proposal status!
        </div>
            <div
            style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <button>
                    Show Status
                </button>
            </div>
            <div
            className="propsosalStatus">
                <ProposalStatus />
            </div>
        </>
    )
}
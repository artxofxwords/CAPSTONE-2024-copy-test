import Nav from "../header/Nav";
import NewProposalForm from "../../modals/NewProposalForm";

export default function Proposal() {

    return (
        <>
        <Nav />

        <h1 style={{
            textAlign: "center",
            fontSize: "250%"
        }}>
            Please Fill out the form to submit a proposal!
        </h1>

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
                
            </div>
        </>
    )
}
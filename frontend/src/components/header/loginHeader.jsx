import Nav from "./Nav.jsx";
import { useNavigate } from "react-router-dom";

export default function loginHeader() {
    const navigateProp = useNavigate();

    return (
        <>
        <Nav />

        <div
            style={{
                display: "inline-flex",
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor: "#1A9988",
                width: "98vw",
                height: "50vh",
                

            }}
            >
                <div
            style={{
                display: "flex",
                width: "90vw",
                height: "auto",
                justifyContent: "center"
            }}
        >
            <div>
                <h1 style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "25%",
                marginRight: "0%",
                color: "white",
                padding: "20px 250px",
                width: "100%",
                height: "auto",
                fontSize: "300%",
                maxWidth: "500%"
        }}>
            Welcome!
        </h1>
        <p style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20%",
            color: "white"
        }}>
            Click the button below to submit a proposal!
        </p>
        <p style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5%"
        }}>
            <button
            type="click"
            onClick={() => navigateProp('/Proposal')}
            style={{
                color: "white",
                marginTop: "10%"
            }}>
            Submit a Proposal
        </button>
        </p>
        
            </div>
            
        </div>

        </div>

        </>
    );
}
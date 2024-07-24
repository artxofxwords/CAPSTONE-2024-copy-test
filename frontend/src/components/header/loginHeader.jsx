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
            backgroundColor:"darkgray",
            width: "95vw",
            height: "40vh",

            }}
            >
                <div
            style={{
                display: "flex",
                width: "90vw",
                height: "auto"
            }}
        >
            <div>
                <h1 style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "25%",
                marginRight: "0%",
                color: "black",
                borderRadius: "15px",
                border: "5px solid black",
                padding: "20px 250px",
                width: "100%",
                height: "auto",
                fontSize: "150%",
                maxWidth: "500%"
        }}>
            Welcome!
        </h1>
        <p style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5%"
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
            onClick={() => navigateProp('/proposal')}>
            Submit a Proposal
        </button>
        </p>
        
            </div>
            <div style={{
                marginLeft: "20%",
                marginTop: "10%"
            }
            }>
                <img
                    src="https://wp.testbytes.net//wp-content/uploads/2019/06/Untitled-1-1-300x210-1.png">
                </img>
            </div>
            
        </div>

        </div>

        </>
    );
}
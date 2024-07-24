import { useNavigate } from "react-router-dom";
import Nav from "../header/Nav";

export default function Proposal() {
    const navigate = useNavigate();

    return (
        <>
        <Nav />

        <h1 style={{
            textAlign: "center",
            fontSize: "250%"
        }}>
            Please Select a category for proposal you want to submit!
        </h1>
        <div
                style={{
                    border: "5px solid black",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "10px",
                    width: "80%",
                    maxWidth: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10%",
                    textAlign: "center"
                }}>
                    <div>
                        Software Engineering
                    </div>
                    <div>
                        Data Analytics
                    </div>
                    <div>
                        UI/UX Design
                    </div>
                    <div>
                        Digital Marketing
                    </div>
        </div>
        
        </>
    )
}
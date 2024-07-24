import { useNavigate } from "react-router-dom";

export default function Nav () {
    const navigate = useNavigate();

    return (
        <div style={{
            width: "95vw",
            height: "10vh",
            backgroundColor: "lightgray",
            alignContent: "center",
            textAlign: "right"
        }}>
            <div style={{
                display: "inline-flex",
                flexDirection: "row"
            }}>
                <button
                type="click"
                onClick={() => navigate('/about')}
                style={{
                    display: "flex",
                    backgroundColor: "white",
                    color: "black",
                    border: "0px",
                    borderRadius: "8px",
                    marginRight: "15px",
                    padding: "5px"
                }}
                >
                    Learn More About the Dev Team
                </button>
                <button 
                type="click"
                onClick={() => navigate('/register')}
                style={{
                    display: "flex",
                    backgroundColor: "white",
                    color: "black",
                    border: "0px",
                    borderRadius: "8px",
                    marginRight: "15px",
                    padding: "5px"
                }}
                >
                    Register as New User
                </button>
                <button
                type="click"
                onClick={() => navigate('/login')}
                style={{
                    display: "flex",
                    backgroundColor: "white",
                    color: "black",
                    border: "0px",
                    borderRadius: "8px",
                    marginRight: "15px",
                    padding: "5px"
                }}
                >
                    Login
                </button>
            </div>
        </div>


    )
}

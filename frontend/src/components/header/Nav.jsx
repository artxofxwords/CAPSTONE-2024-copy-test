import { useNavigate } from "react-router-dom";
import {Button} from "flowbite-react";
import {customTheme} from "../../flowbiteCustom/Flowbite.js";

export default function Nav () {
    const navigate = useNavigate();

    return (
        <div style={{
            width: "screen",
            height: "10vh",
            backgroundColor: "#25394f",
            alignContent: "center",
            textAlign: "right"
        }}>
            <div style={{
                display: "inline-flex",
                flexDirection: "row",
                columnGap: "8px",
                marginRight: "5px"
            }}>
                <img
            width="200px"
            height="50px"
            src="https://cdn.prod.website-files.com/64921323294d7b037da1a52c/649b14c49b4e1c2fd060f3f2_Upright-logo.svg"
          >
          </img>
          <button 
                type="click"
                onClick={() => navigate('/secret')}
                style={{
                    display: "flex",
                    backgroundColor: "unset",
                    color: "black",
                    border: "0px",
                    borderRadius: "8px",
                    marginRight: "15px",
                    marginLeft: "590px",
                    padding: "5px"
                }}
                >
                
                </button>
                <Button theme={customTheme} color="primary"
                type="click"
                onClick={() => navigate('/about')}
                >
                    Meet the Dev Team
                </Button>
                <Button theme={customTheme} color="primary" 
                type="click"
                onClick={() => navigate('/register')}
                >
                    Register as New User
                </Button>
                <Button theme={customTheme} color="primary"
                type="click"
                onClick={() => navigate('/login')}
                >
                    Login
                </Button>
            </div>
        </div>


    )
}

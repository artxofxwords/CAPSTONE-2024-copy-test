import { useNavigate } from "react-router-dom";
import Nav from "../header/Nav";

export default function Library () {
    const navigate = useNavigate();

    return (

        <>
        <Nav />

        <h1 style={{
            textAlign: "center",
            fontSize: "60px"
        }}>Capstone Presentation Video Library</h1>
        <embed src="https://drive.google.com/embeddedfolderview?id=1l1xHtaXW6QsVvrYNuYRom5cM6CUuOtrk#grid" style={{
            width:"100%", 
            height:"600px", 
            border:"0"
            }}>

            </embed>
        
            <div
          style={{
            display: "block",
            textAlign: "right",
            marginRight: "50px"
          }}
        >
          <button
                type="click"
                onClick={() => navigate('/')}
                style={{
                    display: "flex",
                    alignContent: "flex-end",
                    backgroundColor: "#ff532f",
                    color: "black",
                    border: "0px",
                    borderRadius: "8px",
                    marginTop: "1px",
                    marginLeft: "1500px",
                    marginRight: "15px",
                    padding: "5px",
                    paddingBottom: "2px"
                }}
                >
                    Back
                </button>
        </div>
        </>
    )
}

//method for embed found at https://stackoverflow.com/questions/20681974/how-to-embed-a-google-drive-folder-in-a-web-page
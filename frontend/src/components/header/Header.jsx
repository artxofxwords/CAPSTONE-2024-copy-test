import { useNavigate } from "react-router-dom";
import Nav from "./Nav.jsx";

export default function Header() {
    const navigate = useNavigate();
    
  return (
    <>
    <Nav />

      <div
        style={{
        display: "inline-flex",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "gray",
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
          <div style={{
            alignContent: "center",
            textAlign: "center",
            width: "50vw"
          }}>
            <h1
              style={{
                color: "white",
                fontSize: "38px",
              }}
            >
              Headline
            </h1>
            <p
              style={{
                color: "white",
              }}
            >
              Words words words
            </p>
            <button
            onClick={() => navigate("/about")}
              style={{
                backgroundColor: "lightgray",
                color: "black",
                border: "0px",
                borderRadius: "8px"
              }}
            >
              About the dev team
            </button>
          </div>
          <div style={{
            display: "flex",
            width:"50vw",
            height: "auto",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <img
            width="300px"
            height="200px"
            src="https://loremflickr.com/320/240"
          >
          </img>
          </div>
        </div>
      </div>
    </>
  );
}

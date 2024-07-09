import { useNavigate } from "react-router-dom";
import Nav from "../header/Nav";

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <Nav />
      <div>
        <div
          style={{
            width: "95vw",
            height: "50vh",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <h1>Learn about the dev team! :D</h1>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                marginRight: "10px",
                border: "1px solid black",
              }}
            >
              <img src="https://loremflickr.com/320/240/dog"></img>
              <p>Player One Bio</p>
              <p>Words words words</p>
            </div>
            <div
              style={{
                marginRight: "10px",
                border: "1px solid black",
              }}
            >
              <img src="https://loremflickr.com/g/320/240/paris"></img>
              <p>Player Two Bio</p>
              <p>Words words words</p>
            </div>
            <div
              style={{
                marginRight: "10px",
                border: "1px solid black",
              }}
            >
              <img src="https://loremflickr.com/320/240/brazil"></img>
              <p>Player Three Bio</p>
              <p>Words words words</p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "block",
            textAlign: "right",
            marginRight: "50px"
          }}
        >
          <button type="click" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    </>
  );
}

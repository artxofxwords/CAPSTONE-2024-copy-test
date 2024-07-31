import { useNavigate } from "react-router-dom";


export default function Nav() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "screen",
        height: "10vh",
        backgroundColor: "#25394f",
        alignContent: "center",
        textAlign: "right",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          flexDirection: "row",
          columnGap: "8px",
          marginRight: "5px",
        }}
      >
        <img
          width="100px"
          height="100px"
        src="https://cdn.prod.website-files.com/64921323294d7b037da1a52c/649b14c49b4e1c2fd060f3f2_Upright-logo.svg"
        ></img>
        <button
          type="click"
          onClick={() => navigate("/secret")}
          style={{
            display: "flex",
            backgroundColor: "unset",
            color: "black",
            border: "0px",
            borderRadius: "8px",
            marginRight: "15px",
            marginLeft: "790px",
            padding: "5px",
          }}
        ></button>
        <button
          type="click"
          onClick={() => navigate("/about")}
          style={{
            display: "flex",
            backgroundColor: "#ff532f",
            color: "black",
            border: "0px",
            borderRadius: "8px",
            marginRight: "15px",
            padding: "5px",
          }}
        >
          Learn More About the Dev Team
        </button>
        <button
          type="click"
          onClick={() => navigate("/register")}
          style={{
            display: "flex",
            backgroundColor: "#ff532f",
            color: "black",
            border: "0px",
            borderRadius: "8px",
            marginRight: "15px",
            padding: "5px",
          }}
        >
          Register as New User
        </button>
        <button
          type="click"
          onClick={() => navigate("/login")}
          style={{
            display: "flex",
            backgroundColor: "#ff532f",
            color: "black",
            border: "0px",
            borderRadius: "8px",
            marginRight: "15px",
            padding: "5px",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

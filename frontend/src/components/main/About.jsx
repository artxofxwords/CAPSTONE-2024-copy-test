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
            fontSize: "50px",
            textAlign: "center",
            marginLeft: "1vw",
            marginTop: "5vh",

          }}
        >
          <h4>
            <b>Meet the Dev Team!</b>
          </h4>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "row",
              backgroundColor: "#1a9988",
              fontSize: "15px",
            }}
          >
            <div
              style={{
                marginRight: "10px",
                justifyContent: "center",
                alignContent: "center",
                border: "1px solid black",
                padding: "20px"
              }}
            >
              <div
                style={{
                  marginLeft: "45px",
                  justifyContent: "center",
                  alignContent: "center",
                  padding: "20px",
                }}
              >
                <img src="https://loremflickr.com/320/240/dog"></img>
              </div>
              <p>
                <b>Player One Bio</b>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                at felis semper, tempus mi id, feugiat orci. Donec auctor
                pellentesque tellus ac dapibus. Donec imperdiet, purus id
                lacinia ultricies, nisi neque faucibus sem, non dictum mauris
                nisi a nisl. Aliquam luctus rhoncus dui at egestas. Integer urna
                enim, tincidunt et lectus eu, posuere pulvinar lectus. Proin
                interdum purus finibus ornare iaculis. Quisque placerat neque ac
                elementum maximus. In magna ligula, tincidunt sit amet finibus
                ultrices, posuere at erat. In ut eleifend risus, tristique
                lacinia turpis. Etiam eleifend finibus erat nec luctus. Cras
                consequat consequat erat, non volutpat nisi vehicula sit.
              </p>
            </div>
            <div
              style={{
                marginRight: "10px",
                justifyContent: "center",
                alignContent: "center",
                border: "1px solid black",
                padding: "20px",
              }}
            >
              <div
                style={{
                  marginLeft: "45px",
                  justifyContent: "center",
                  alignContent: "center",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    marginLeft: "45px",
                    justifyContent: "center",
                    alignContent: "center",
                    padding: "20px",
                  }}
                >
                  <img src="https://loremflickr.com/g/320/240/paris"></img>
                </div>
              </div>
              <p>
                <b>Player Two Bio</b>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                at felis semper, tempus mi id, feugiat orci. Donec auctor
                pellentesque tellus ac dapibus. Donec imperdiet, purus id
                lacinia ultricies, nisi neque faucibus sem, non dictum mauris
                nisi a nisl. Aliquam luctus rhoncus dui at egestas. Integer urna
                enim, tincidunt et lectus eu, posuere pulvinar lectus. Proin
                interdum purus finibus ornare iaculis. Quisque placerat neque ac
                elementum maximus. In magna ligula, tincidunt sit amet finibus
                ultrices, posuere at erat. In ut eleifend risus, tristique
                lacinia turpis. Etiam eleifend finibus erat nec luctus. Cras
                consequat consequat erat, non volutpat nisi vehicula sit.
              </p>
            </div>
            <div
              style={{
                justifyContent: "center",
                alignContent: "center",
                border: "1px solid black",
                padding: "20px",
              }}
            >
              <div
                style={{
                  marginLeft: "45px",
                  justifyContent: "center",
                  alignContent: "center",
                  padding: "20px",
                }}
              >
                <img src="https://loremflickr.com/320/240/dog"></img>
              </div>
              <p>
                <b>Player Three Bio</b>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                at felis semper, tempus mi id, feugiat orci. Donec auctor
                pellentesque tellus ac dapibus. Donec imperdiet, purus id
                lacinia ultricies, nisi neque faucibus sem, non dictum mauris
                nisi a nisl. Aliquam luctus rhoncus dui at egestas. Integer urna
                enim, tincidunt et lectus eu, posuere pulvinar lectus. Proin
                interdum purus finibus ornare iaculis. Quisque placerat neque ac
                elementum maximus. In magna ligula, tincidunt sit amet finibus
                ultrices, posuere at erat. In ut eleifend risus, tristique
                lacinia turpis. Etiam eleifend finibus erat nec luctus. Cras
                consequat consequat erat, non volutpat nisi vehicula sit.
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "block",
            textAlign: "right",
          }}
        >
          <button
            type="click"
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignContent: "flex-end",
              backgroundColor: "#ff532f",
              color: "black",
              border: "0px",
              borderRadius: "8px",
              marginTop: "45vh",
              marginLeft: "96vw",
              marginRight: "15px",
              padding: "5px",
              paddingBottom: "2px",
            }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}

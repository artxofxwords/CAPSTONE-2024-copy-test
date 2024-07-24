import Nav from "./Nav.jsx";

export default function Header() {
    
  return (
    <>
    <Nav />

      <div
        style={{
        display: "inline-flex",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor:"darkcyan",
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
                fontSize: "60px",
              }}
            >
              Headline
            </h1>
            <p
              style={{
                color: "white",
                fontSize: "18px",
                marginBottom: "14px"
              }}
            >
              Words words words
            </p>
            <button><a
            href="https://www.uprighted.com/courses"
            target="_blank"
              style={{
                backgroundColor: "lightgray",
                color: "black",
                border: "0px",
                borderRadius: "8px"
              }}
            >
              Learn more about Upright tech bootcamps!
            </a></button>
          </div>
          <div style={{
            display: "flex",
            width:"50vw",
            height: "auto",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <img 
            src="https://loremflickr.com/320/240"
          >
          </img>
          </div>
        </div>
      </div>
    </>
  );
}

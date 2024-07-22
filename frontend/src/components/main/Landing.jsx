import Header from "../header/Header.jsx";
import Testimonies from "../main/Testimonies.jsx"
import Carousal from "./Carousal.jsx";

export default function Landing () {


    return (
        <div style={{
            // backgroundColor: "purple"
            // marginLeft: "1px",
            // marginRight: "1px"
        }}>
            <Header />

            <Testimonies />

            <Carousal />
        </div>
    )
}
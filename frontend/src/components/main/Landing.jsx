import LoginHeader from "../header/loginHeader.jsx";

import Header from "../header/Header.jsx";
import Testimonies from "../main/Testimonies.jsx"
import Carousal from "./Carousal.jsx";
import Categories from "./Categories.jsx";

export default function Landing () {


    return (
        <div style={{
            // backgroundColor: "purple"
            // marginLeft: "1px",
            // marginRight: "1px"
        }}>
            <LoginHeader/>
            {/* <Header /> */}



           {/* <Categories/> */}

            <Testimonies />

            <Carousal />
        </div>
    )
}
import LoginHeader from "../header/loginHeader.jsx";

import Header from "../header/Header.jsx";
import Carousal from "./Carousal.jsx";
import Categories from "./Categories.jsx";

export default function Landing () {


    return (
        <div style={{
            marginLeft: "25px"
        }}>
            <LoginHeader/>
            {/* <Header /> */}


            <Categories/>
            {/* <Carousal /> */}
        </div>
    )
}
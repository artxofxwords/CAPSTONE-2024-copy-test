import "../../CSS/Categories.css"
import { useNavigate } from "react-router-dom";

export default function Categories() {
    const navigateCat = useNavigate();

    return (
        <>
        <div>
            <h1 
            style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2em",
                marginTop: "2%",
                marginBottom: "2%"
            }}>
                Categories
            </h1>
            <p
            style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
            }}>
                <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "10px",
                    width: "80%",
                    maxWidth: "80%",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div 
                    style={{
                        color: "black",
                        textAlign: "center",
                        border: "1px solid #ddd"
                    }}>
                        <img 
                        className="softwareEngineeringPhoto"
                        src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        
                        style={{
                            height: "20vh",
                            width: "15vw",
                            margin: "auto",
                            position: "relative"
                        }}/>
                        <div className="SFTWREPts"
                        style={{
                            position: "absolute",
                            bottom: "53vh",
                            left: "15vw",
                            color: "white"
                        }}>
                        • Javascript Foundations
                        </div>
                        <div className="SFTWREPts"
                        style={{
                            position: "absolute",
                            color: "white",
                            bottom: "50vh",
                            left: "15vw"
                        }}>
                        • React Front-End Development
                        </div>
                        <div className="SFTWREPts"
                        style={{
                            position: "absolute",
                            color: "white",
                            bottom: "47vh",
                            left: "15vw"
                        }}>
                        • MongoDB Back-End Development
                        </div>
                        <div className="SFTWREPts"
                        style={{
                            position: "absolute",
                            color: "white",
                            bottom: "44vh",
                            left: "15vw"
                        }}>
                        • Full-Stack Software Development
                        </div>
                        <div className="SFTWREENGR" 
                        style={{

                        }}>
                            Software Engineering
                        </div>
                    </div>
                    <div
                    style={{
                        color: "black",
                        textAlign: "center",
                        border: "1px solid #ddd",
                        position: "relative"
                    }}>
                        <img src="https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        style={{
                            height: "20vh",
                            width: "15vw",
                            margin: "auto"
                        }}/>
                        <div className="SFTWREPts"
                        style={{
                            position: "absolute",
                            bottom: "5vh",
                            left: "5vw",
                            color: "black"
                        }}>
                        • Social Media Management

                        </div>
                        <div className="SFTWREPts"
                        style={{
                            position: "absolute",
                            color: "black",
                            bottom: "7vh",
                            left: "5vw"
                        }}>
                        • Content and Email Marketing

                        </div>
                        <div className="SFTWREPts"
                        style={{
                            position: "absolute",
                            color: "black",
                            bottom: "9vh",
                            left: "5vw"
                        }}>
                        • Search Engine Marketing

                        </div>
                        <div className="SFTWREPts"
                        style={{
                            position: "absolute",
                            color: "black",
                            bottom: "11vh",
                            left: "5vw"
                        }}>
                        • Marketing Automation
                        </div>
                        <button
                        type="click"
                        onClick={() => navigateCat('/digitalMarketing')}>
                        Digital Marketing</button>
                    </div>
                    <div
                    style={{

                        color: "black",
                        textAlign: "center",
                        border: "1px solid #ddd"
                    }}>
                        <img src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            style={{
                                height: "20vh",
                                width: "15vw",
                                // objectFit: "cover",
                                // display: "block",
                                margin: "auto"
                            }}
                        />
                        <button
                        type="click"
                        onClick={() => navigateCat('/UiUxDesign')}>
                        UI/UX Design</button>

                    </div>
                    <div
                    style={{
                        color: "black",
                        textAlign: "center",
                        border: "1px solid #ddd",
                        marginLeft: "-2%"
                    }}>
                        <img src="https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        style={{
                            height: "20vh",
                            width: "15vw",
                            margin: "auto"
                        }}/>
                        <button
                        type="click"
                        onClick={() => navigateCat('/DataAnalytics')}>
                            Data Analytics</button>
                    </div>
                    <img src=""/>
                </div>
            </p>
        </div>
        </>
    )
}
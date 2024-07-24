
import { useNavigate } from "react-router-dom";

export default function categories() {
    const navigateCat = useNavigate();

    return (
        <>
        <div>
            <h1 
            style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "200%",
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
                    border: "5px solid black",
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
                        backgroundColor: "#4CAF50",
                        color: "black",
                        padding: "45%",
                        textAlign: "center",
                        border: "1px solid #ddd"
                    }}>
                        <img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
                        <button
                        type="click"
                        onClick={() => navigateCat('/softwareEngineering')}>
                            Software Engineering</button>
                        
                    </div>
                    <div
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        // padding: "45%",
                        textAlign: "center",
                        border: "1px solid #ddd"
                    }}>
                        <img src="https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
                        <button
                        type="click"
                        onClick={() => navigateCat('/digitalMarketing')}>
                        Digital Marketing</button>
                    </div>
                    <div
                    style={{
                        backgroundColor: "#78B87A",
                        color: "white",
                        // padding: "%",
                        textAlign: "center",
                        border: "1px solid #ddd"
                    }}>
                        <img src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            style={{
                                height: "15vh",
                                width: "5vw",
                                objectFit: "cover",
                                display: "block",
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
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "45%",
                        textAlign: "center",
                        border: "1px solid #ddd",
                        marginLeft: "-2%"
                    }}>
                        <img src="https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
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
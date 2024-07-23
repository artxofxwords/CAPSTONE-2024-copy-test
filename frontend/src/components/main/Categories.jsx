export default function categories() {

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
                    alignItems: "center",
                    paddingTop: "0%",
                    paddingBottom: "0%"
                }}>
                    <div 
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "black",
                        padding: "45%",
                        textAlign: "center",
                        border: "1px solid #ddd"
                    }}>
                        <button>Software Engineering</button>
                        <img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
                    </div>
                    <div
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "45%",
                        textAlign: "center",
                        border: "1px solid #ddd"
                    }}>
                        <button>Digital Marketing</button>
                    </div>
                    <div
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "45%",
                        textAlign: "center",
                        border: "1px solid #ddd"
                    }}>
                        <button>UI/UX Design</button>
                        <img src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
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
                        <button>Data Analytics</button>
                    </div>
                    <img src=""/>
                </div>
            </p>
        </div>
        </>
    )
}
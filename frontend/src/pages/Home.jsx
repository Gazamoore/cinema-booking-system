import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home(){

    const navigate = useNavigate();

    //testing to see if my session is working and the variables are carried over properly
    useEffect(() => {
        fetch(
            "http://localhost/cinema-booking-system/backend/api/auth/checkSession.php",
            {
                method: "GET",
                credentials: "include"
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Session error:", error);
        });
    }, []);

    function handleLogout(){
        fetch(
            "http://localhost/cinema-booking-system/backend/api/auth/logout.php",
            {
                method: "POST",
                credentials: "include"
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.success){
                navigate("/");
            }
        })
        .catch(error => {
            console.error("Logout error:", error);
        });
    }

    return (
        <div>
            <h1>
                Cinema Booking System
            </h1>

            <p>
                Please select a cinema, movie and showtime to make a booking
            </p>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Home;
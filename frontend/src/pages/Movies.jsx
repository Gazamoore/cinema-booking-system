import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Movies(){

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(null);

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
            setIsLoggedIn(Boolean(data.loggedIn));
        })
        .catch(error => {
            console.error("Session error:", error);
            setIsLoggedIn(false);
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
        <div className="home-page">
            <nav className="home-nav">
                <div className="home-nav-links">
                    <a href="/home">Home</a>
                    <a href="/movies">Movies</a>
                    {/*Only showing the bookings nav link if the user is logged in*/}
                    {isLoggedIn === true && <a href="/bookings">My Bookings</a> }
                </div>
                <div className="home-nav-actions">
                    {/*Checking to see if the user is logged in or not and displaying either the login or logout button respectfully*/}
                    {isLoggedIn === false && (
                        <button className="nav-button" onClick={() => navigate("/")}>
                            Login
                        </button>
                    )}
                    {isLoggedIn === true && (
                        <button className="nav-button" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </nav>
            <header className="home-container">
                <h1>Select A Cinema</h1>
                <div className="home-btns">
                    
                </div>
            </header>
        </div>
    );
}
export default Movies;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Bookings(){
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [bookings, setBookings] = useState([]);

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

    useEffect(() => {
        fetch(
            "http://localhost/cinema-booking-system/backend/api/bookings/viewBookings.php",
            {
                method: "GET",
                credentials: "include"
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.success){
                setBookings(data.bookings);
            }
        })
        .catch(error => {
            console.error("Bookings error:", error);
        });

    }, [isLoggedIn]);

    return(
        <div className="home-page">
            <nav className="home-nav">
                <div className="home-nav-links">
                    <a href="/home">Home</a>
                    <a href="/movies">Movies</a>
                    {/*Only showing the bookings nav link if the user is logged in*/}
                    {isLoggedIn === true && <a href="/Bookings">My Bookings</a> }
                </div>
                <div className="home-nav-actions">
                    {/*Checking to see if the user is logged in or not and displaying either the login or logout button respectfully*/}
                    {isLoggedIn === false && (
                        <button className="nav-btn" onClick={() => navigate("/")}>
                            Login
                        </button>
                    )}
                    {isLoggedIn === true && (
                        <button className="nav-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </nav>
            <div className="tbl-wrap">
                    <table className="bookings-tbl">
                        <thead>
                            <tr>
                                <th>Movie</th>
                                <th>Cinema</th>
                                <th>Theatre</th>
                                <th>Show Date and Time</th>
                                <th>Tickets</th>
                                <th>Booking Reference</th>
                                <th>Booked At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.booking_id}>
                                    <td>{booking.movie_title}</td>
                                    <td>{booking.cinema_name}</td>
                                    <td>{booking.theatre_name}</td>
                                    <td>{booking.show_time}</td>
                                    <td>{booking.number_of_tickets}</td>
                                    <td>{booking.booking_reference}</td>
                                    <td>{booking.booked_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
    );
}
export default Bookings;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Movies(){

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [showtimes, setShowtimes] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedShowtime, setSelectedShowtime] = useState("");
    const [numberOfTickets, setNumberOfTickets] = useState(1);
    const [message, setMessage] = useState("");

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

    useEffect(() => {
        fetch("http://localhost/cinema-booking-system/backend/api/show-time/getShowtimes.php")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.success){
                setShowtimes(data.showtimes);
            }
        })
        .catch(error => {
            console.error("Showtimes error:", error);
        });
    }, [])

    const cinemas = [
        ...new Map(showtimes.map(showtime => [
                showtime.cinema_id,
                {
                    id: showtime.cinema_id,
                    name: showtime.cinema_name
                }
            ])
        ).values()
    ];

    const movies = [...new Map(showtimes.filter(showtime => String(showtime.cinema_id) === selectedCinema).map(showtime => [
                showtime.movie_id,
                {
                    id: showtime.movie_id,
                    title: showtime.title
                }
            ])
        ).values()
    ];
    //only displaying the showtimes for the selected movie
    const availableShowtimes = showtimes.filter(showtime =>
        String(showtime.cinema_id) === selectedCinema && String(showtime.movie_id) === selectedMovie
    );

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

    function handleBooking(){
        if(!selectedShowtime){
            setMessage("Please select a showtime.");
            return;
        }

        if(!Number.isInteger(Number(numberOfTickets)) || Number(numberOfTickets) < 1){
            setMessage("Please select at least one ticket.");
            return;
        }
        setMessage("");
        fetch(
            "http://localhost/cinema-booking-system/backend/api/bookings/bookMovie.php",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    showtime_id: selectedShowtime,
                    number_of_tickets: Number(numberOfTickets)
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            if (data.success){
                setMessage("Booking successful. Your booking reference is: " + data.booking_reference);
                setSelectedShowtime("");
                setNumberOfTickets(1);
            } else {
                setMessage("Booking failed. " + data.message);
            }
        })
        .catch(error => {
            console.error("Error in making you're booking: ", error);
            setMessage("Unable to complete the booking. Please try again.");
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
            <div className="home-container">
                    <h1>Movies</h1>
                    <label htmlFor="cinema">
                        Select a Cinema
                    </label>
                    <select
                        id="cinema"
                        value={selectedCinema}
                        onChange={(e) => {
                            setSelectedCinema(e.target.value);
                            setSelectedMovie("");
                            setSelectedShowtime("");
                            setMessage("");
                        }}
                    >
                        <option value="">Choose a cinema</option>
                        {cinemas.map(cinema => (
                            <option key={cinema.id} value={cinema.id}>
                                {cinema.name}
                            </option>
                        ))}
                    </select>
                    {selectedCinema !== "" && (
                        <>
                            <label htmlFor="movie">
                                Select a Movie
                            </label>
                            <select
                                id="movie"
                                value={selectedMovie}
                                onChange={(e) => {
                                    setSelectedMovie(e.target.value);
                                    setSelectedShowtime("");
                                    setMessage("");
                                }}
                            >
                                <option value="">
                                    Choose a movie
                                </option>
                                {movies.map(movie => (
                                    <option key={movie.id} value={movie.id}>
                                        {movie.title}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    {selectedMovie !== "" && (
                        <>
                            <label htmlFor="showtime">
                                Select a showtime.
                            </label>
                            <select
                                id="showtime"
                                value={selectedShowtime}
                                onChange={(e) => {
                                    setSelectedShowtime(e.target.value);
                                    setMessage("");
                                }}
                            >
                                <option value="">
                                    Choose a showtime
                                </option>
                                {availableShowtimes.map(showtime => (
                                    <option key={showtime.id} value={showtime.id}>
                                        {showtime.theatre_name} -{" "}
                                        {new Date(showtime.show_time.replace(" ", "T")).toLocaleDateString()}{" "}
                                        at{" "}
                                        {new Date(showtime.show_time.replace(" ", "T")).toLocaleDateString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    {selectedShowtime !== "" && (
                        <>
                            <label htmlFor="tickets">
                                Number of Tickets
                            </label>
                            <input
                                id="tickets"
                                type="number"
                                min="1"
                                step="1"
                                value={numberOfTickets}
                                onChange={(e) => 
                                    setNumberOfTickets(e.target.value)
                                }
                            />
                            {isLoggedIn === true && (
                                <button className="book-btn" onClick={handleBooking}>
                                    Book Tickets
                                </button>
                            )}
                            {isLoggedIn === false && (
                                <button className="book-btn" onClick={() => alert("You must be logged in to book a ticket")}>
                                    Book Tickets
                                </button>
                            )}
                            
                        </>
                    )}

                    {message !== "" && (
                        <p role="status">
                            {message}
                        </p>
                    )}
            </div>
        </div>
    );
}
export default Movies;

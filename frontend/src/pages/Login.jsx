import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    //storing the email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //initialising the navigate function
    const navigate = useNavigate();

    //sending login info to the backend
    const handleSubmit = (e) => {
        e.preventDefault();
            fetch(
                "http://localhost/cinema-booking-system/backend/api/auth/login.php",
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    //using credentials to ensure that the sessions work
                    credentials: "include",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            )
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if (data.success){
                    navigate("/Home");
                }
            })
            .catch(error => {
                console.error("Login error: ", error);
            });
            //testing to see why my backend wasnt sending back data
            /*.then(response => {
                console.log("HTTP status:", response.status);
                return response.text();
            })
            .then(data => {
                console.log("Backend response:", data)
            })*/
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>
                    Login
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="email">
                            Email: 
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">
                            Password: 
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                    <button type="button" className="register-button" onClick={() => navigate("/register")}>
                        Create Account
                    </button>
                    <button type="button" className="guest-access-button" onClick={() => navigate("/Home")}>
                        Continue as Guest
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
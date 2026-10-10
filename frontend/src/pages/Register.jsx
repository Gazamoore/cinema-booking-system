import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleRegistration(e) {
        e.preventDefault();

        fetch(
            "http://localhost/cinema-booking-system/backend/api/auth/register.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    first_name: firstName,
                    email: email,
                    password: password
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if(data.success){
                alert("Account Created Successfully");
                navigate("/");
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error("Registration error:", error);
        });
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>
                    Account Information
                </h1>
                <form onSubmit={handleRegistration}>
                    <div className="input-container">
                        <label htmlFor="first-name">
                            First Name: 
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
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
                    <button type="submit" className="register-btn">
                        Create Account
                    </button>
                    <button type="button" className="login-btn" onClick={(e) => navigate("/")}>
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;


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
                navigate("/home");
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error("Registration error:", error);
        });
    }

    return (
        <div>
            <h1>
                Account Information
            </h1>
            <form onSubmit={handleRegistration}>
                <div>
                    <label>
                        First Name: 
                    </label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>
                        Email: 
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>
                        Password: 
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    Create Account
                </button>
            </form>
            <button type="submit" onClick={() => navigate("/")}>
                Back to Login
            </button>
        </div>
    );
}

export default Register;
import { useState } from "react";

function Login() {
    //storing the email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //sending login info to the backend
    const handleSubmit = (event) => {
        event.preventDefault();
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
            //.then(response => response.json())
            //.then(data => {
            //    console.log(data);
            //})
            .then(response => {
                console.log("HTTP status:", response.status);
                return response.text();
            })
            .then(data => {
                console.log("Backend response:", data)
            })
            .catch(error => {
                console.error("Login error: ", error);
            });
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
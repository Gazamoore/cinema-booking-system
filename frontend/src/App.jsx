import { useEffect, useState } from "react";

function App() {
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {

    fetch('http://localhost/cinema-booking-system/backend/api/cinemas/getCinemas.php')
      .then(response => response.json())
      .then(data => {
        setCinemas(data);
      })
      .catch(error => {
        console.error('Error fetching cinemas:', error);
      });
  }, []);

  return (
    <div>
      <h1>Cinema Booking System</h1>
      <h2>Cinemas</h2>

      {cinemas.map(cinema =>(
        <div key={cinema.id}>
          <h3>{cinema.name}</h3>
          <p>{cinema.address}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

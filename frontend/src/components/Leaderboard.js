import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Fetch top 5 scores from the backend
    const fetchScores = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leaderboard/top5");
        setScores(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Player Name</th> {/* Change header to Player Name */}
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((entry, index) => (
            <tr key={index}>
              <td>{entry.playerName}</td> {/* Use playerName instead of username */}
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

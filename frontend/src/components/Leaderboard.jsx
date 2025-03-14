import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock Data (Replace with API call later)
  const mockData = [
    { playerName: "Alice", score: 95 },
    { playerName: "Bob", score: 90 },
    { playerName: "Charlie", score: 85 },
    { playerName: "David", score: 80 },
    { playerName: "Emma", score: 75 },
  ];

  useEffect(() => {
    // Simulate API call with delay
    setTimeout(() => {
      setPlayers(mockData); // Replace with real API response later
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table className="leaderboard">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.playerName}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;

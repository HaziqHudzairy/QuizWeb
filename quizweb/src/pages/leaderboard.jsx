import React, { useEffect, useState } from 'react';
import { database, ref, onValue } from '../js/firebaseConfig.js';
import './leaderboard.css';

function Leaderboard({ userName }) {
    const [highscores, setHighscores] = useState([]);

    useEffect(() => {
        const highscoresRef = ref(database, 'highscores');

        const unsubscribe = onValue(highscoresRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const formatted = Object.values(data);

                formatted.sort((a, b) => {
                    if (b.score === a.score) return a.time - b.time;
                    return b.score - a.score;
                });

                setHighscores(formatted);
            }
        }, (error) => {
            console.error('Error fetching highscores:', error);
        });

        return () => unsubscribe(); // Clean up listener on unmount
    }, []);


    return (
        <div className="leaderboard">
            <h3>🏆 Leaderboard</h3>
            <div className="leaderboard-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Score</th>
                            <th>Total Time (s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {highscores.map((entry, index) => (
                            <tr
                                key={index}
                                className={entry.name === userName ? 'highlight-row' : ''}
                            >
                                <td className={`rank rank-${index}`}>
                                    {index === 0 && '🥇'}
                                    {index === 1 && '🥈'}
                                    {index === 2 && '🥉'}
                                    <span className="rank-number">#{index + 1}</span>
                                </td>
                                <td>{entry.name}</td>
                                <td>{entry.score}</td>
                                <td>{entry.time}s</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}


export default Leaderboard;

import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';

const Roulette: React.FC = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState<string>('');
  const [winner, setWinner] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const rouletteRef = useRef<HTMLDivElement>(null);

  // Ajouter un participant à la liste
  const addParticipant = () => {
    if (newParticipant.trim() !== '') {
      setParticipants([...participants, newParticipant]);
      setNewParticipant('');
    }
  };

  // Lancer la roulette
  const startRoulette = () => {
    if (participants.length > 1) {
      setSpinning(true);
      setWinner(null);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * participants.length);
        setWinner(participants[randomIndex]);
        setSpinning(false);
        setShowConfetti(true);
      }, 3000); // Temps de rotation avant de sélectionner un gagnant
    }
  };

  // Effet pour arrêter la confetti après quelques secondes
  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [showConfetti]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🎉 Jeu de la Roulette 🎉</h1>

      {/* Formulaire pour ajouter des participants */}
      <input
        type="text"
        placeholder="Entrez le nom du participant"
        value={newParticipant}
        onChange={(e) => setNewParticipant(e.target.value)}
        style={styles.input}
      />
      <button onClick={addParticipant} style={styles.button}>
        Ajouter participant
      </button>

      {/* Liste des participants */}
      <div style={styles.participantsContainer}>
        <h3 style={styles.participantsHeader}>Participants :</h3>
        <ul style={styles.participantsList}>
          {participants.map((participant, index) => (
            <li key={index} style={styles.participantItem}>
              {participant}
            </li>
          ))}
        </ul>
      </div>

      {/* Bouton pour lancer la roulette */}
      <button
        onClick={startRoulette}
        style={{
          ...styles.button,
          backgroundColor: spinning || participants.length <= 1 ? '#ccc' : '#ff4d4d',
          cursor: spinning || participants.length <= 1 ? 'not-allowed' : 'pointer',
        }}
        disabled={spinning || participants.length <= 1}
      >
        {spinning ? 'Roulette en cours...' : 'Lancer la roulette'}
      </button>

      {/* Animation de la roulette */}
      <div
        ref={rouletteRef}
        style={{
          ...styles.roulette,
          transform: spinning ? 'rotate(1440deg)' : 'rotate(0deg)',
        }}
      >
        {winner ? (
          <span style={styles.winnerText}>{winner}</span>
        ) : (
          'Tournez la roulette !'
        )}
      </div>

      {/* Effet confetti pour la victoire */}
      {showConfetti && <Confetti />}
    </div>
  );
};

// Styles CSS-in-JS
const styles = {
  container: {
    textAlign: 'center' as const,
    marginTop: '50px',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    padding: '20px',
  },
  header: {
    fontSize: '3rem',
    color: '#333',
    marginBottom: '20px',
    textShadow: '2px 2px #ff4d4d',
  },
  input: {
    padding: '10px',
    fontSize: '1.2rem',
    borderRadius: '8px',
    border: '2px solid #ff4d4d',
    outline: 'none',
    marginBottom: '10px',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    borderRadius: '8px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
    transition: 'background-color 0.3s ease',
  },
  participantsContainer: {
    marginTop: '20px',
  },
  participantsHeader: {
    fontSize: '1.5rem',
    color: '#555',
  },
  participantsList: {
    listStyleType: 'none' as const,
    padding: 0,
  },
  participantItem: {
    fontSize: '1.2rem',
    color: '#333',
    backgroundColor: '#fff',
    padding: '8px',
    borderRadius: '8px',
    margin: '5px 0',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  roulette: {
    width: '250px',
    height: '250px',
    margin: '50px auto',
    borderRadius: '50%',
    border: '10px solid #ff4d4d',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    backgroundColor: '#fff',
    transition: 'transform 3s ease-in-out',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
  },
  winnerText: {
    color: '#ff4d4d',
    fontWeight: 'bold' as const,
    fontSize: '2rem',
  },
};

export default Roulette;

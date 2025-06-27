import './App.css'
import React, { useState, useEffect, useMemo } from 'react';

function PoliticianCard({name, image, position, party, biography, politician}) {
  console.log("Card");
  
  return (
    <div className="politician-card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p><strong>Partito:</strong> {party}</p>
            <p><strong>Ruolo:</strong> {position}</p>
            <p><strong>Biografia:</strong> {biography}</p>
          </div>
  )
}

const MemoPoliticanCard = React.memo(PoliticianCard);

function App() {

  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3333/politicians') // Replace with actual API endpoint
      .then(response => response.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error('Error fetching politicians:', error));
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => 
    politician.name.toLowerCase().includes(search.toLowerCase()) ||
    politician.biography.toLowerCase().includes(search.toLowerCase())
  )}, [politicians, search]);
  
  return (
    <div>
      <h1>Lista dei politici</h1>
      <input 
      type="text" 
      placeholder='Cerca per nome o biografia'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />
      <div className="politicians-list">
        {filteredPoliticians.map(politician => (
          <MemoPoliticanCard key={politician.id} {...politician}/>
        ))}
        {politicians.length === 0 && <p>Nessun politico trovato.</p>}
      </div>
    </div>
  )
  
}

export default App

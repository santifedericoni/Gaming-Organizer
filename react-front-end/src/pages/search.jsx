import React, { useState, useEffect } from 'react';
import useDebounce from './use-debounce';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';

export default function app(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
     console.log('resultados',results)
    

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then(results => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  );
  return (
    <div>
      <input
        placeholder="Search a Game"
        onChange={e => setSearchTerm(e.target.value)}
      />

      {isSearching && <div>Searching ...</div>}
      {results.map(result => (
        <div key={result.id}>
          <h2>{result.name}</h2>
          <Link to = '/login'>
          <img width="400" height="200"
            src={`${result.background_image}`}
          />
          </Link>
        </div>
      ))}
    </div>
  );
}

function searchCharacters(search) {
  const queryString = `${search}`;
  return fetch(
    `https://api.rawg.io/api/games?search=${queryString}`,
    {
      method: 'GET'
    }
  )
    .then(r => r.json())
    .then(r => r.results)
    .catch(error => {
      console.error(error);
      return [];
    });
}

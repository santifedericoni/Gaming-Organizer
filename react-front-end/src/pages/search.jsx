import React, { useState, useEffect } from 'react';
import useDebounce from './use-debounce';

export default function app(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
    console.log('resultados',results)
    console.log('searchTerm',searchTerm)

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
          <h4>{result.name}</h4>
          <img width="900" height="600"
            src={`${result.short_screenshots[0].image}`}
          />
        </div>
      ))}
    </div>
  );
}

function searchCharacters(search) {
//   const apiKey = 'f9dfb1e8d466d36c27850bedd2047687';
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

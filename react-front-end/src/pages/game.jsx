import React from 'react';
import { Container } from '@material-ui/core';

const MainPage = (props) => {
let result = {}
    const getGame = () => {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = `https://api.rawg.io/api/games/${props.gameState.name}`
      fetch(proxyUrl + targetUrl)
        .then(blob => blob.json())
        .then(data => {
          result = data;
          console.log('resultado',result)
      return data;
    })
    .catch(e => {
      console.log(e);
      return e;
    });
  }
 getGame();
console.log('resultado',result)
  if (result === {}){
  return (
    <Container>
    <div >
        <h1>{result.description}</h1>
        {/* {console.log('test',result.description)} */}
        Game info
    </div>
    </Container>
  );
  } else {
    return (
        <div>
        <h1>{result.description}</h1>
        {/* {console.log('test',result.description)} */}
        </div>
    );
  }
};

export default MainPage;

import React, {useEffect, useState} from "react";
import Navbar from "./components/Navbar";
import Characters from "./components/Characters";
import Pagination from "./components/Pagination";

function App() {

  //data storage
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});

  const initialUrl = "https://rickandmortyapi.com/api/character";

  const fetchCharacters = (url) => {
    //data request in API
    fetch(url)
    //json to javascript conversion
    .then(response => response.json())
    //data collection
    .then(data => {
      //personajes
      setCharacters(data.results);
      //info de next y previous
      setInfo(data.info);
    })
    //error
    .catch(error => console.log(error))
  };

  const onPrevious = ()=>{
    fetchCharacters(info.prev);
  }

  const onNext = ()=>{
    fetchCharacters(info.next);
  }

  useEffect(()=>{
    fetchCharacters(initialUrl)
  }, [])

  return (
    <>
    <Navbar brand="TITULO PAGINA"/>
    <div className="container mt-5">
      <Pagination prev={info.prev} next={info.next} onPrevious={onPrevious} onNext={onNext}/>
      <Characters characters={characters}/>
      <Pagination prev={info.prev} next={info.next}  onPrevious={onPrevious} onNext={onNext}/>
    </div>
    </>
    

  );
}

export default App;

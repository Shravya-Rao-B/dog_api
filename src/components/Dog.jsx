import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fecthDataFromApi } from '../utils/fetchDataFromApi';
import "../components/Dog.styles.css"
const imageBaseUrl = 'https://cdn2.thedogapi.com/images/';


const Dog = () => {
  const [dogBreed, setDogBreed] = useState({});
  const { breed } = useParams();
  useEffect(() => {
    fecthDataFromApi(`breeds/search?q=${breed}`)
      .then((res) => {
        setDogBreed(res.data[0]);
      })
  }, [breed])
  return (
    <div className='dog--container' data-testid="app-dogcomp">
      <div className='image--container' data-testid="app-img">
        {dogBreed &&
          <img
            src={`${imageBaseUrl}${dogBreed.reference_image_id}.jpg`}
            alt={dogBreed.name}
            loading="lazy"
            onError={(e) =>
            (
              (e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png")
            )
            }
          />
        }
      </div>
      {
        dogBreed &&
        <div className='details--container'>
          {dogBreed.name && <h1>{dogBreed.name}</h1>}
          {dogBreed.origin && <p><b>Origin: </b> {dogBreed.origin}</p>}
          {dogBreed.bred_for && <p><b>Bred For: </b> {dogBreed.bred_for}</p>}
          {dogBreed.breed_group && <p><b>Breed Group: </b>{dogBreed.breed_group}</p>}
          {dogBreed.height && dogBreed.height.metric && <p><b>Height: </b>{dogBreed.height.metric} cm</p>}
          {dogBreed.weight && dogBreed.weight.metric && <p><b>Weight: </b>{dogBreed.weight.metric} Kgs</p>}
          {dogBreed.temperament && <p><b>Temperament: </b>{dogBreed.temperament}</p>}
          {dogBreed.life_span && <p><b>Life Span: </b>{dogBreed.life_span}</p>}
          <Link to="/">
            <button className='back--btn'>Back</button>
          </Link>
        </div>
      }
    </div>
  )
}

export default Dog
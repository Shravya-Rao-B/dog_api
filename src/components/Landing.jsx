import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fecthDataFromApi } from '../utils/fetchDataFromApi'
import { sortDogs, formatObj, debounce } from '../utils/helperFunctions'
import './Landing.styles.css';
const imageBaseUrl = 'https://cdn2.thedogapi.com/images/';
const Landing = () => {
    const [allBreeds, setAllBreeds] = useState([]);
    useEffect(() => {
        fecthDataFromApi(`breeds?`)
            .then((res) => {
                setAllBreeds(formatObj(res.data));
            })
    }, [])

    const handleChange = (value) => {
        if(value[0])
        fecthDataFromApi(`breeds/search?q=${value}`)
            .then((res) => {
                    setAllBreeds(formatObj(res.data));
            })
    }
    const searchBreeds = debounce(handleChange);
    const sortHandler = (value) => {
        const options = {
            "name": sortDogs(allBreeds, "name", "asc"),
            "heightFormatted": sortDogs(allBreeds, "heightFormatted", "asc"),
            "lifeSpanFormatted": sortDogs(allBreeds, "lifeSpanFormatted", "asc")
        };
        setAllBreeds(options[value]);
    }
    return (
        <div className='container--landing'>
            <div className='title' data-testid="app-title"><h1 >Paw Dictionary</h1></div>
            <div className='searchbar--nav'>
                <form>
                    <input type="text" 
                    placeholder='Search dog breeds' 
                    className='searchbar' 
                    onChange={(e) => searchBreeds(e.target.value)} 
                    data-testid="app-searchbar"
                    />
                </form>
                <div className='sort--div'>
                    <select onChange={(e) => sortHandler(e.target.value)} data-testid="app-sort">
                        <option value="name" data-testid="sort">Sort</option>
                        <option value="name" data-testid="name">Name</option>
                        <option value="heightFormatted" data-testid="height">Height</option>
                        <option value="lifeSpanFormatted" data-testid="lifespan">Lifespan</option>
                    </select>
                </div>
            </div>
             <div className="img--container">
                {
                    allBreeds.map(breed =>
                        <Link to={`/${breed.name}`} key={breed.id} className="image--link">
                            <div className="img--div" alt={breed.name} key={breed.id}>
                                <img
                                    src={`${imageBaseUrl}${breed.reference_image_id}.jpg`}
                                    alt={breed.name}
                                    loading="lazy"
                                    onError={(e) =>
                                    (
                                        (e.target.src =
                                            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png")
                                    )
                                    }
                                />
                                <div>
                                    <h3>{breed.name}</h3>
                                    <p>Height: {breed.height.metric} cm</p>
                                    <p>Life Span: {breed.life_span}</p>
                                </div>
                                <div>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Landing
import React, {useState, useEffect} from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    //state(variables), hooks
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    //a snippet of code that runs based on a certain condition
    //pull info from tmdb when row loads
    useEffect(() => {
        //if [], run once when row loads and don't run it again

        //create a function to fetch data from tmdb database
        async function fetchData(){
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results);
            return request;
        }

        fetchData();

    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('');
        }else{
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            {/* a container to store the all the posters */}
            <div className="row__posters">
                {/* several row__poster(s) */}
                { movies.map(movie => (
                    <img 
                        key={movie.id}
                        onClick= {() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt = {movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId = {trailerUrl} opts = {opts}/>}
        </div> 
    )
}

export default Row
import  { useEffect } from 'react'    
function Movie() {
    useEffect(() => {
  async function fetchMovies() {
    const res = await fetch(
      `https://www.omdbapi.com/?s=batman&apikey=c8bca4f7`
    );
    const data = await res.json();
    console.log(data);
  }
  fetchMovies();
},[] );

    return (

        <div>
            <p className='text-black'>hi hi</p>
        </div>
    )
}

export default Movie

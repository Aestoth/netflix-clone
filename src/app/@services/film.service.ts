import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { iMovies } from '../@interfaces/movies';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  api = environment.apiKey

  constructor(private http:HttpClient) { }

  async getData() {
    const response = {
      trending: [] as iMovies[],
      discover: []  as iMovies[],
      genres: [
        {name: '', results: [] as iMovies[]}
      ]
    };
    response.trending = await this.getTrending()
    response.discover = await this.getDiscoverMovies()
    const listIdGenres = await this.getGenreMovies()
    const moviesListByGenreId = listIdGenres.map(async(genre) =>{
      const films = await this.getMoviesGenreId(genre.id)
      console.log("film", films);
      
      return {results: films, name: genre.name}
    })
    response.genres = await Promise.all(moviesListByGenreId)
    return response
  }

  async getTrending(): Promise<iMovies[]>{
    const {results = []} = await this.http
    .get<{results: iMovies[]}>(`https://api.themoviedb.org/3/trending/movie/week?api_key=${this.api}`)
    .toPromise()
    return results.map(movie => {
      movie.poster_path = `https://image.tmdb.org/t/p/original/${movie.poster_path}
      `
      movie.backdrop_path = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}
      `
      return movie
    })
  }

  async getDiscoverMovies(): Promise<iMovies[]>{
    const {results = []} = await this.http
    .get<{results: iMovies[]}>(`https://api.themoviedb.org/3/discover/movie?api_key=${this.api}`)
    .toPromise()
    return results.map(movie => {
      movie.poster_path = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
      return movie
    })
  }

  async getGenreMovies(): Promise<{id: number, name:string}[]> {
    const {genres = []} = await this.http
    .get<{genres: {id: number, name:string}[]}>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.api}`)
    .toPromise()
    return genres
  }

  async getMoviesGenreId(genreId: number): Promise<iMovies[]>{
  const {results = []} = await this.http
  .get<{results: iMovies[]}>(`https://api.themoviedb.org/3/discover/movie?api_key=${this.api}&with_genres=${genreId}`)
  .toPromise();
  
  
  return results.map(movie => {
    movie.poster_path = `https://image.tmdb.org/t/p/original/${movie.poster_path}
    `
    return movie
  })
}


}

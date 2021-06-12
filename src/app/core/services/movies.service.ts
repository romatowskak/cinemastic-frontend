import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/shared/models/Movie';
import { User } from 'src/app/shared/models/User';
import { MovieRating } from 'src/app/shared/models/MovieRating';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}

  public getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${environment.apiUrl}/movies`);
  }

  public getMovieDetails(movieId: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${environment.apiUrl}/movies/${movieId}`);
  }

  public updateMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.put<Movie>(`${environment.apiUrl}/movies/${movie.id}`, movie);
  }

  public getRatings(): Observable<MovieRating[]> {
    return this.httpClient.get<MovieRating[]>(`${environment.apiUrl}/ratings`);
  }

  public addRating(value: number, movie: Movie, user: User): Observable<MovieRating> {
    const rating = { value, user: user.user, movie };
    return this.httpClient.post<MovieRating>(`${environment.apiUrl}/ratings`, rating);
  }

  public updateRating(rating: MovieRating): Observable<MovieRating> {
    return this.httpClient.put<MovieRating>(`${environment.apiUrl}/ratings/${rating.id}`, rating);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/shared/models/Movie';

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
}

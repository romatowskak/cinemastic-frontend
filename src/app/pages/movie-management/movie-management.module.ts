import { NgModule } from '@angular/core';
import { MovieDetailsResolver } from 'src/app/core/resolvers/MovieDetailsResolver';
import { MoviesResolver } from 'src/app/core/resolvers/MoviesResolver';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieDetailsFormComponent } from './movie-details-form/movie-details-form.component';
import { MovieManagementRoutingModule } from './movie-management-routing.module';
import { MovieManagingPanelComponent } from './movie-managing-panel.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { RemoveMovieDialogComponent } from './remove-movie-dialog/remove-movie-dialog.component';

@NgModule({
  declarations: [MovieManagingPanelComponent, MoviesListComponent, MovieDetailsFormComponent, RemoveMovieDialogComponent],
  imports: [MovieManagementRoutingModule, SharedModule],
  entryComponents: [RemoveMovieDialogComponent],
  providers: [MoviesResolver, MovieDetailsResolver],
})
export class MovieManagementModule {}

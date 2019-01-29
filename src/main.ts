import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app/app';
import {MainComponent} from './app/main/main.component';
import {CardComponent} from './app/card/card.component';
import {DialogComponent} from './app/dialog/dialog.component';
import {SpinnerComponent} from './app/spinner/spinner.component';
import {SearchComponent} from './app/search/search.component';
import {HeaderComponent} from './app/header/header.component';
import {PopularComponent} from './app/popular/popular.component';
import {FavoritesComponent} from './app/favorites/favorites.component';
import {FavoriteButtonComponent} from './app/favoriteButton/favorite.button.component';
import {DetailsComponent} from './app/details/details.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: PopularComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '**', component: PopularComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    ),
    BrowserModule,
    MatGridListModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule


  ],
  declarations: [
    AppComponent,
    MainComponent,
    CardComponent,
    DialogComponent,
    SpinnerComponent,
    SearchComponent,
    FavoriteButtonComponent,
    HeaderComponent,
    PopularComponent,
    FavoritesComponent,
    DetailsComponent
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);


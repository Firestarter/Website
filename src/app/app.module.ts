import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SafePipe, VoteComponent } from './vote/vote.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GuideComponent } from './guide/guide.component';
import { MarkdownModule } from 'ngx-markdown';
import { PunishmentsComponent } from './punishments/punishments.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'vote',
    component: VoteComponent
  },
  {
    path: 'guide',
    component: GuideComponent
  },
  {
    path: 'punishments/:id',
    component: PunishmentsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '404',
    component: NotFoundComponentComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    HomeComponent,
    SafePipe,
    GuideComponent,
    PunishmentsComponent,
    NotFoundComponentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}

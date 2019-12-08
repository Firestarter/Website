import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'codelyzer';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {MarkdownService} from 'ngx-markdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [':host {width: 100%;}']
})
export class HomeComponent implements OnInit {

  title = 'Firestarter';
  limit = 5;

  // Voter information
  votername = 'Fetching...';
  voteruuid = 'e4ae86d8-8040-4e76-a3b3-ba0fba1caf69';
  votervotes = 0;

  ip = 'firestartermc.com';
  color = '#FF5B5B';
  online = 0;
  tempcontent = '### So, why did we make this site?\n' +
    'Because why not? This is the new site and it is very cool and you are encouraged to use it because it is so cool\n' +
    '\n' +
    '### Wow, that\'s so cool\n' +
    'I know, right?\n';

  posts: Observable<any[]>;

  constructor(private http: HttpClient, private markdownService: MarkdownService, private afs: AngularFirestore) {
    this.posts = this.afs.collection('posts', ref => ref.limit(this.limit)).valueChanges();

    // Update online count
    this.http.get('https://api.minetools.eu/ping/firestartermc.com')
      .subscribe((data: Config) => {
        this.online = data['players']['online'];
      });

    // Update voter information
    this.http.get('https://api.firestartermc.com/votes')
      .subscribe((data: Config) => {
        this.voteruuid = data[0]['uuid'];
        this.votervotes = data[0]['votes'];

        this.http.get('https://api.minetools.eu/uuid/e4ae86d880404e76a3b3ba0fba1caf69')
          .subscribe((d: Config) => {
            this.votername = d['name'];
          });
      });
  }

  copyIP() {
    // Copy the IP
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.ip;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    // Set field to "Copied IP"
    this.ip = 'Copied IP!';
    this.color = '#51DF56';

    // Reset back to normal after 2 seconds
    setTimeout(() => {
      this.ip = 'firestartermc.com';
      this.color = '#FF5B5B';
    }, 2000);
  }

  ngOnInit() {
  }

}

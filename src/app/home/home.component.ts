import {Component, OnInit} from '@angular/core';
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

  discordonline = 0;

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

    // Update Discord online count
    this.http.get('https://discordapp.com/api/guilds/609452308161363995/widget.json')
      .subscribe((data: Config) => {
        this.discordonline = data['members'].length;
      });

    // Update voter information
    this.http.get('https://api.firestartermc.com/votes')
      .subscribe((data: Config) => {
        this.voteruuid = data[0]['_id'];
        this.votervotes = data[0]['votes'];

        this.http.get(`https://api.minetools.eu/uuid/${data[0]['_id'].replace(/-/g, "")}`)
          .subscribe((d: Config) => {
            this.votername = d['name'];
          });
      });
  }

  ngOnInit() {
  }

}

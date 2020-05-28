import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from 'codelyzer';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {MarkdownService} from 'ngx-markdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [':host {width: 100%;}']
})
export class HomeComponent implements OnInit {
  onlineCounts = {
    server: 0,
    discord: 0
  };

  topVoter = {
    uuid: 'e4ae86d8-8040-4e76-a3b3-ba0fba1caf69',
    name: 'ヽ(゜∇゜)ノ',
    votes: 0
  };

  posts: Observable<any[]>;

  constructor(private http: HttpClient, private markdownService: MarkdownService, private afs: AngularFirestore) {
    this.posts = this.afs.collection('posts', ref => ref.limit(5)).valueChanges();

    this.http.get('https://api.minetools.eu/ping/firestartermc.com').subscribe((data: Config) => {
      this.onlineCounts.server = data['players']['online'];
    });

    this.http.get('https://discordapp.com/api/guilds/609452308161363995/widget.json').subscribe((data: Config) => {
      this.onlineCounts.discord = data['members'].length;
    });

    this.http.get('https://api.firestartermc.com/players/votes/top').subscribe((data: Config) => {
      this.http.get(`https://api.minetools.eu/uuid/${data[0].uuid.replace(/-/g, '')}`).subscribe((result: Config) => {
        this.topVoter = {
          uuid: data[0]['uuid'],
          name: result['name'],
          votes: data[0]['votes']
        };
      });
    });
  }

  ngOnInit() {
  }

}

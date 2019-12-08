import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  pages = [
    'https://minecraftservers.org/vote/562392',
    'https://www.planetminecraft.com/server/firestarter-4385861/vote/',
    'https://minecraft-statistic.net/en/server/157.245.9.245_25565.html',
    'https://minecraft-server-list.com/server/445696/vote/',
    'https://minecraft-mp.com/server/232422/vote/',
    'https://topminecraftservers.org/vote/7919',
    'https://minecraft-server.net/vote/Firestarter/',
    'https://minecraftservers.biz/servers/144798/',
    'https://minecraftlist.org/vote/13840',
    'https://www.trackyserver.com/server/firestarter-a-1-14-4-survival-realm-349950'
  ];
  page = this.pages[0];

  constructor() { }

  ngOnInit() {
  }

}

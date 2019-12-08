import { Component, OnInit } from '@angular/core';
import {MarkdownService} from 'ngx-markdown';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css'],
})
export class GuideComponent implements OnInit {

  guide = 'https://gist.githubusercontent.com/nkomarn/91c54ffaf539fc003892022713e4ecc8/raw/bf7fd0ff6c5a75743125820f2390c854c7f18337/markdown-test';

  constructor(private markdownService: MarkdownService) {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return '<h' + level + '>' +
        '<a name="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
        '<span class="header-link"></span>' +
        '</a>' + text +
        '</h' + level + '>';
    };
  }

  ngOnInit() {
  }

}

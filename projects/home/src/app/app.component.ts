import { Component } from '@angular/core';
import {MarkdownModule} from "ngx-markdown";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}

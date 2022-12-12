import { Component } from '@angular/core';
import {GithubDataModel} from "./models/githubdata.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data : GithubDataModel = new GithubDataModel();

  setData(data : GithubDataModel) : void {
    this.data = data;
  }

}

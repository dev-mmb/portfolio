import {Component, Input} from '@angular/core';
import {ProjectModel} from "../../models/project.model";
import {GithubService} from "../../services/github.service";
import {GithubDataModel} from "../../models/githubdata.model";

@Component({
  selector: 'app-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: ['./project-tile.component.scss']
})
export class ProjectTileComponent {
  @Input() project : GithubDataModel = new GithubDataModel();
  @Input() selected : boolean = false;

  constructor() {
  }

  getProjectName() : string {
    return this.project.name;
  }
}

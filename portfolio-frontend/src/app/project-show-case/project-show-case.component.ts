import {Component, Input} from '@angular/core';
import {GithubDataModel} from "../models/githubdata.model";
import {GithubService} from "../services/github.service";

@Component({
  selector: 'app-project-show-case',
  templateUrl: './project-show-case.component.html',
  styleUrls: ['./project-show-case.component.scss']
})
export class ProjectShowCaseComponent {
  @Input() data : GithubDataModel = new GithubDataModel();

  constructor(private github : GithubService) {}

  getMarkupLink() : string {
    return this.github.getReadmeLink(this.data.full_name, this.data.default_branch);
  }
}

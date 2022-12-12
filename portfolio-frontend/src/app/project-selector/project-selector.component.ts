import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProjectModel} from "../models/project.model";
import {GithubService} from "../services/github.service";
import {GithubDataModel} from "../models/githubdata.model";

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss']
})
export class ProjectSelectorComponent {
  @Output() onSelect : EventEmitter<GithubDataModel> = new EventEmitter<GithubDataModel>();
  projects : {project : GithubDataModel, selected : boolean}[] = [];

  constructor(private github : GithubService) {
    let prjcts : ProjectModel[] = [];
    prjcts.push(new ProjectModel("meesmb/Monogame-Extended-Particle-Sandbox"));
    prjcts.push(new ProjectModel("meesmb/xivpricecalculator"));
    prjcts.push(new ProjectModel("meesmb/IPRWC-frontend"));
    prjcts.push(new ProjectModel("meesmb/SimpleModelViewer"));
    //todo: fill projects from api

    let sel = true;
    prjcts.forEach(project => {
      github.getRepoInfo(project.Link).then(data => {
        this.projects.push({project: data, selected: sel});
        if (sel) this.onSelect.emit(data);
        sel = false;
      });
    });


  }
  select(project : GithubDataModel) : void {
    this.projects.forEach(entry => {
      let last = entry.selected;
      entry.selected = (entry.project.name === project.name);
      if (entry.selected && !last) // only emit if this is not already selected
        this.onSelect.emit(entry.project);
    });
  }
}

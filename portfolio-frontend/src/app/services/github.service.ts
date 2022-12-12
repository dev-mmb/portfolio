import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";
import {GithubDataModel} from "../models/githubdata.model";

@Injectable({
  providedIn: 'root'
})
export class GithubService extends HttpService{

  constructor(http : HttpClient) {
    super(http, "https://api.github.com")
  }


  async getRepoInfo(link : string) : Promise<GithubDataModel> {
    return await this._get(`/repos/${link}`);
  }
  u = "https://raw.githubusercontent.com/meesmb/xivpricecalculator/develop/README.md";

  getReadmeLink(ownerRepo : string, branch : string) : string {
    return "https://raw.githubusercontent.com/" + ownerRepo + "/" + branch + "/README.md";
  }
}

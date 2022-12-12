import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MarkdownModule} from "ngx-markdown";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ProjectComponent } from './project-show-case/project/project.component';
import { ProjectSelectorComponent } from './project-selector/project-selector.component';
import { ProjectTileComponent } from './project-selector/project-tile/project-tile.component';
import { ProjectShowCaseComponent } from './project-show-case/project-show-case.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ProjectSelectorComponent,
    ProjectTileComponent,
    ProjectShowCaseComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        HttpClientModule,
        MarkdownModule.forRoot({loader: HttpClient})
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {Component, Input} from '@angular/core';
import {MarkdownService} from "ngx-markdown";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() url: string = "";

  imgCssClasses: string[] = [
    "md-img",
  ];
  iconCssClasses: string[] = [
    "md-img-icon"
  ];

  constructor(private markdownService: MarkdownService) {
    markdownService.renderer.image = (href: string, title: string, text: string): string => {
      let css = this.cssListToString(this.imgCssClasses);

      return this.createImg(href, title, text, css);
    }

    markdownService.renderer.link = (href: string, title: string, text: string) => {
      let index = text.indexOf("<img ");
      if (index !== -1) {
        let sub = text.substring(index);
        let newsub = this.addCss(sub, this.cssListToString(this.iconCssClasses));

        text = text.replace(sub, newsub);
      }

      return this.createLink(href, title, text, null);
    }

  }

  private cssListToString(list : string[]) : string {
    let css = "";
    list.forEach(cssclass => css += cssclass + " ");
    return css;
  }
  private createLink(href: string, title: string, text: string, css: string | null): string {
    if (css === null)
      return "<a href=" + href + " > " + text + "</a>";

    return "<a href=" + href + " class=" + css + ">text</a>"
  }

  private createImg(href: string, title: string, text: string, css: string | null): string {
    if (css === null) return "<p><img src=" + href + " alt=" + text + "></p>";


    return "<p><img src=" + href + " alt=" + text + " class=\"" + css + "\"></p>";
  }

  private addCss(tag : string, css : string) : string {
    let old = this.extractCss(tag);
    if (old === "") return tag;
    let n = old + " " + css;

    let start = this.getCssStart(tag);
    let end = this.getCssEnd(tag, start);
    return tag.replace(old, n);
  }
  private extractCss(tag : string) : string {
    let start = this.getCssStart(tag);
    if (start === -1) return "";

    let end = this.getCssEnd(tag, start);
    if (end === -1) return "";

    return tag.substring(start, end);
  }
  private getCssStart(tag : string) : number {
    let querry = "class=\"";

    let i = tag.indexOf(querry);
    if (i === -1) return i;
    return i + querry.length;
  }
  private getCssEnd(tag : string, start : number) : number {
    return tag.indexOf("\"", start);
  }
}

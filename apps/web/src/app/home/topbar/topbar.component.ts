import {Component} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";

@Component({
  standalone: true,
  selector: "home-topbar",
  templateUrl: "./topbar.component.html",
  imports: [
    NgOptimizedImage
  ]
})

export class TopbarComponent {
}

import {Component} from "@angular/core";
import {TopbarComponent} from "./topbar/topbar.component";
import {HeroComponent} from "./hero/hero.component";
import {ProjectComponent} from "./project/project.component";
import {ContactComponent} from "./contact/contact.component";

@Component({
  standalone: true,
  selector: "app-home",
  templateUrl: "./home.component.html",
  imports: [
    TopbarComponent,
    HeroComponent,
    ProjectComponent,
    ContactComponent,
  ],
})

export class HomeComponent {
}

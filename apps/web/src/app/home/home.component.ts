import {Component} from "@angular/core";
import {TopbarComponent} from "./topbar/topbar.component";
import {HeroComponent} from "./hero/hero.component";
import {OddComponent} from "./odd/odd.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  standalone: true,
  selector: "app-home",
  templateUrl: "./home.component.html",
  imports: [
    TopbarComponent,
    HeroComponent,
    OddComponent,
    FooterComponent,
  ],
})

export class HomeComponent {
}

import {Component} from "@angular/core";
import {TopbarComponent} from "./topbar/topbar.component";
import {HeroComponent} from "./hero/hero.component";
import {OddComponent} from "./odd/odd.component";
import {FooterComponent} from "./footer/footer.component";
import {ContactComponent} from "./contact/contact.component";

@Component({
  standalone: true,
  selector: "app-home",
  templateUrl: "./home.component.html",
  imports: [
    TopbarComponent,
    HeroComponent,
    OddComponent,
    ContactComponent,
    FooterComponent,
  ],
})

export class HomeComponent {
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { NavbarMobileComponent } from '@components/mobile/navbar-mobile/navbar-mobile.component';
import { LoaderComponent } from '@components/loader/loader.component';
import { filter } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [
    LoaderComponent,
    NavbarComponent,
    NavbarMobileComponent,
    RouterOutlet,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        const routeTitle = this.getRouteTitle(this.activatedRoute.root);
        if (routeTitle) {
          this.titleService.setTitle(routeTitle);
        }
      });
  }

  // Función para obtener el título de la ruta activa
  private getRouteTitle(route: ActivatedRoute): string | null {
    let title = route.snapshot.data['title'];
    if (route.firstChild) {
      title = this.getRouteTitle(route.firstChild);
    }
    return title;
  }
}

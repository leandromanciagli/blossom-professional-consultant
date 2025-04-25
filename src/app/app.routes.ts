import { Routes } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { CoursesComponent } from '@components/courses/courses.component';
import { WorkshopsComponent } from '@components/workshops/workshops.component';
import { ProfessionalsComponent } from '@components/professionals/professionals.component';
import { CourseDetailsComponent } from '@components/courses/course-details/course-details.component';
import { CartComponent } from '@components/cart/cart.component';
import { CheckoutComponent } from '@components/cart/checkout/checkout.component';


export const routes: Routes =
    [
        { path: 'home', component: HomeComponent, data: { title: 'Inicio - Blossom Consultora Profesional' } },
        { path: 'home/success', component: HomeComponent, data: { title: 'Inicio - Blossom Consultora Profesional' } },
        { path: 'home/failure', component: HomeComponent, data: { title: 'Inicio - Blossom Consultora Profesional' } },
        { path: 'home/pending', component: HomeComponent, data: { title: 'Inicio - Blossom Consultora Profesional' } },
        { path: 'courses', component: CoursesComponent, data: { title: 'Cursos - Blossom Consultora Profesional' } },
        { path: 'professionals', component: ProfessionalsComponent, data: { title: 'Profesionales - Blossom Consultora Profesional' } },
        // { path: 'workshops', component: WorkshopsComponent, data: { title: 'Workshops - Blossom Consultora Profesional' } },
        { path: 'course/:courseId', component: CourseDetailsComponent, data: { title: 'Curso - Blossom Consultora Profesional' } },
        { path: 'cart', component: CartComponent, data: { title: 'Carrito - Blossom Consultora Profesional' } },
        { path: 'checkout', component: CheckoutComponent, data: { title: 'Carrito - Blossom Consultora Profesional' } },
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ];

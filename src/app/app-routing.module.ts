import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {HomeComponent} from "./components/home/home.component";
import {authGuard} from "./components/auth/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
        path: 'home',
        component: HomeComponent,
        children: [
          {
            path: 'categories',
            canActivate: [authGuard],
            loadComponent: () => import('./components/category/category-list/category-list.component').then(m => m.CategoryListComponent)
          },
          {
            path: 'categories/create',
            canActivate: [authGuard],
            loadComponent: () => import('./components/category/category-create/category-create.component').then(m => m.CategoryCreateComponent)
          },
          {
            path: 'categories/edit/:id',
            canActivate: [authGuard],
            loadComponent: () => import('./components/category/category-edit/category-edit.component').then(m => m.CategoryEditComponent)
          },
          {
            path: 'products',
            canActivate: [authGuard],
            loadComponent: () => import('./components/product/product-list/product-list.component').then(m => m.ProductListComponent)
          },
          {
            path: 'products/create',
            canActivate: [authGuard],
            loadComponent: () => import('./components/product/product-create/product-create.component').then(m => m.ProductCreateComponent)
          },
          {
            path: 'products/edit/:id',
            canActivate: [authGuard],
            loadComponent: () => import('./components/product/product-edit/product-edit.component').then(m => m.ProductEditComponent)
          }
        ]
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth-callback',
    loadComponent: () => import('./components/auth/auth-callback/auth-callback.component').then(m => m.AuthCallbackComponent)
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

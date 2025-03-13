import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { SignInUIComponent } from './components-ui/sign-in-ui/sign-in-ui.component';
import { PageNotFoundComponentComponent } from './components-ui/PageError/page-not-found-component/page-not-found-component.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './Services/AuthGuard/auth.guard';
import { SecurityRolesComponent } from './components/system/security-roles/security-roles.component';
import { UsersComponent } from './components/system/users/users.component';
import { MenuComponent } from './components/system/menu/menu.component';
import { ModuleRecordsComponent } from './components/Module/module-records/module-records.component';
import { AboutUsComponent } from './components/Module/module-task/about-us/about-us.component';
import { BlogComponent } from './components/Module/module-task/blog/blog.component';
import { ContactUsComponent } from './components/Module/module-task/contact-us/contact-us.component';
import { HomeComponent } from './components/Module/module-task/home/home.component';
import { PromosComponent } from './components/Module/module-task/promos/promos.component';
import { ModuleComponent } from './components/Module/module/module.component';
import { SubmoduleComponent } from './components/Module/submodule/submodule.component';
import { RoleComponent } from './components/system/role/role.component';
import { UserAccountComponent } from './components-ui/ProfileAccount/user-account/user-account.component';
import { AboutUSComponent } from './components/UserWebsite/about-us/about-us.component';
import { PromoComponent } from './components/UserWebsite/promo/promo.component';
import { MyBlogComponent } from './components/UserWebsite/my-blog/my-blog.component';
import { ContactComponent } from './components/UserWebsite/contact/contact.component';
import { TopheaderComponent } from './components/UserWebsite/topheader/topheader.component';
import { WorkExperienceComponent } from './components/UserWebsite/work-experience/work-experience.component';
import { MyHomeComponent } from './components/UserWebsite/my-home/my-home.component';



  const routes: Routes = [
  { 
    path: '', 
    component:TopheaderComponent, 
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage', component: MyHomeComponent },
      { path: 'about_us', component: AboutUSComponent },
      { path: 'promo', component: PromoComponent },
      { path: 'blogs', component: MyBlogComponent },
      { path: 'work', component: WorkExperienceComponent },
      { path: 'contact_us', component: ContactComponent },
      { path: 'login', component: SignInUIComponent },

    ] 
  },
 

  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'material', 
        loadChildren: () => import('./material-component/material.module')
          .then(m => m.MaterialComponentsModule) 
      },
      { 
        path: 'home', 
        loadChildren: () => import('./dashboard/dashboard.module')
          .then(m => m.DashboardModule) 
      },
      { path: 'security', component: SecurityRolesComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
      { path: 'user', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
      { path: 'role', component: RoleComponent, canActivate: [AuthGuard] },
      { path: 'module', component: ModuleComponent, canActivate: [AuthGuard]},
      { path: 'submodule', component: SubmoduleComponent, canActivate: [AuthGuard] },
      { path: 'about', component: AboutUsComponent, canActivate: [AuthGuard] },
      { path: 'contact-us', component: ContactUsComponent, canActivate: [AuthGuard] },
      { path: 'home-website', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
      { path: 'promos', component: PromosComponent, canActivate: [AuthGuard] },
      { path: 'module-records', component: ModuleRecordsComponent, canActivate: [AuthGuard] },
      { path: 'account', component: UserAccountComponent, canActivate: [AuthGuard] },
    ]
  },

  { path: '**', component: PageNotFoundComponentComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})


export class AppRoutingModule { }
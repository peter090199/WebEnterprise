
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { MaterialModule } from 'src/Material/Material.module';


import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { SignInUIComponent } from './components-ui/sign-in-ui/sign-in-ui.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { SecurityRolesComponent } from './components/system/security-roles/security-roles.component';
import { SecurityRolesUIComponent } from './components-ui/system/security-roles-ui/security-roles-ui.component';
import { MenuUIComponent } from './components-ui/system/menu-ui/menu-ui.component';
import { MenuComponent } from './components/system/menu/menu.component';
import { AddSubMenuComponent } from './components-ui/system/add-sub-menu/add-sub-menu.component';
import { MatCardModule } from '@angular/material/card';
import { ModuleTaskComponent } from './components/Module/module-task/module-task.component';
import { ModuleRecordsComponent } from './components/Module/module-records/module-records.component';
import { ModuleTaskUIComponent } from './components-ui/module-task-ui/module-task-ui.component';
import { ContactusUIComponent } from './components-ui/Website/ModuleRecords/contactus-ui/contactus-ui.component';
import { ModuleUIComponent } from './components-ui/module-ui/module-ui.component';
import { PromosUIComponent } from './components-ui/Website/ModuleRecords/promos-ui/promos-ui.component';
import { HomeUIComponent } from './components-ui/Website/ModuleRecords/home-ui/home-ui.component';
import { BlogUIComponent } from './components-ui/Website/ModuleRecords/blog-ui/blog-ui.component';
import { AboutUIComponent } from './components-ui/Website/ModuleRecords/about-ui/about-ui.component';
import { RoleUIComponent } from './components-ui/system/role-ui/role-ui.component';
import { RoleComponent } from './components/system/role/role.component';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { BlogImageUIComponent } from './components-ui/Website/Images/blog-image-ui/blog-image-ui.component';
import { ModuleComponent } from './components/Module/module/module.component';
import { PromosComponent } from './components/Module/module-task/promos/promos.component';
import { ContactComponent } from './components/UserWebsite/contact/contact.component';
import { ContactUsComponent } from './components/Module/module-task/contact-us/contact-us.component';
import { BlogComponent } from './components/Module/module-task/blog/blog.component';
import { AboutUsComponent } from './components/Module/module-task/about-us/about-us.component';
import { BlogRecordsComponent } from './components/Blog/blog-records/blog-records.component';
import { UserAccountComponent } from './components-ui/ProfileAccount/user-account/user-account.component';
import { MyBlogComponent } from './components/UserWebsite/my-blog/my-blog.component';
import { MessengerChatComponent } from './components-ui/messenger-chat/messenger-chat.component';
import { LoadingInterceptor } from './Services/Loading/http.interceptor';
import { TopheaderComponent } from './components/UserWebsite/topheader/topheader.component';
import { WorkExperienceComponent } from './components/UserWebsite/work-experience/work-experience.component';
import { ScrollAnimateDirective } from './directives/scroll-animate.directive';
import { AboutPageComponent } from './components/UserWebsite/about-page/about-page.component';
import { MyHomeComponent } from './components/UserWebsite/my-home/my-home.component';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    SignInUIComponent,
    SecurityRolesComponent,
    SecurityRolesUIComponent,
    MenuUIComponent,
    AddSubMenuComponent,
    MenuComponent,
    ModuleTaskComponent,
    ModuleRecordsComponent,
    ModuleTaskUIComponent,
    ModuleUIComponent,
    PromosUIComponent,
    HomeUIComponent,
    BlogUIComponent,
    AboutUIComponent,
    RoleUIComponent,
    RoleComponent,
    ModuleComponent,
    PromosComponent,
    ContactComponent,
    ContactusUIComponent,
    ContactUsComponent,
    BlogImageUIComponent,
    BlogComponent,
    AboutUsComponent,
    BlogRecordsComponent,
    UserAccountComponent,
    MyBlogComponent,
    MessengerChatComponent,
    TopheaderComponent,
    WorkExperienceComponent,
    ScrollAnimateDirective,
    AboutPageComponent,
    MyHomeComponent,
    ImageDialogComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    MatCardModule,
    MaterialModule,
    ToastrModule.forRoot(),
  ],
  // providers: [
  //   {
  //     provide: LocationStrategy,
  //     useClass: PathLocationStrategy,
  //   }
  // ],
  providers: [DatePipe, { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  { path: "admin", component: LayoutComponent,children: [
    { path: "accounts", loadChildren:()=> import("./admin/components/accounts/accounts.module").
      then(module=> module.AccountsModule) },
    { path: "banks", loadChildren:()=> import("./admin/components/banks/banks.module").
      then(module=> module.BanksModule) },
    { path: "transactions", loadChildren:()=> import("./admin/components/transactions/transactions.module").
      then(module=> module.TransactionsModule) },
    { path: "users", loadChildren:()=> import("./admin/components/users/users.module").
      then(module=> module.UsersModule) }
   // { path: "dashboard",loadChildren:()=> import("./admin/components/dashboard/dashboard.module").
    //  then(module=> module.DashboardModule) }// home ve dashin direk gelmesi için çağırmadan böyle ypaıyoruz 

  ], canActivate: [AuthGuard]
  },
  {path: "", component: HomeComponent},
  {path: "accounts", loadChildren: () => import("./ui/components/accounts/accounts.module").
    then(module => module.AccountsModule)
   },
   {path: "transactions", loadChildren: () => import("./ui/components/transactions/transactions.module").
    then(module => module.TransactionsModule)
   },
   {path: "register", loadChildren: () => import("./ui/components/register/register.module").
    then(module => module.RegisterModule)
   },
   {path: "login", loadChildren: () => import("./ui/components/login/login.module").
    then(module => module.LoginModule)
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { AccountsComponent } from "./pages/accounts/accounts.component"
import { DomainsComponent } from "./pages/domains/domains.component"
import { ForwardersComponent } from "./pages/forwarders/forwarders.component"
import { LoginComponent } from "./pages/login/login.component"

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: {
      isFullscreen: true
    }
  },
  {
    path: "domains",
    component: DomainsComponent,
    data: {
      isFullscreen: false
    }
  },
  {
    path: "accounts",
    redirectTo: "accounts/"
  },
  {
    path: "accounts/:id",
    component: AccountsComponent,
    data: {
      isFullscreen: false
    }
  },
  {
    path: "forwarders",
    redirectTo: "forwarders/"
  },
  {
    path: "forwarders/:id",
    component: ForwardersComponent,
    data: {
      isFullscreen: false
    }
  },
  {
    path: "**",
    redirectTo: "accounts/"
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

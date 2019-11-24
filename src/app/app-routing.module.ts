import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { AccountsComponent } from "./pages/accounts/accounts.component"
import { DnsComponent } from "./pages/dns/dns.component"
import { DkimDialogEntryComponent } from "./pages/domains/components/dkim-dialog/dkim-dialog.component"
import { DomainsComponent } from "./pages/domains/domains.component"
import { ForwardersComponent } from "./pages/forwarders/forwarders.component"
import { LoginComponent } from "./pages/login/login.component"
import { ProfileComponent } from "./pages/profile/profile.component"

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
      title: "Domains"
    },
    children: [
      {
        path: ":domain/dkim/:action",
        component: DkimDialogEntryComponent
      }
    ]
  },
  {
    path: "accounts",
    redirectTo: "accounts/"
  },
  {
    path: "accounts/:id",
    component: AccountsComponent,
    data: {
      title: "Email Accounts"
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
      title: "Forwarders"
    }
  },
  {
    path: "dns",
    component: DnsComponent,
    data: {
      title: "DNS Check"
    }
  },
  {
    path: "profile",
    component: ProfileComponent,
    data: {
      title: "Profile"
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

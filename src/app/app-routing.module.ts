import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AccountsComponent } from './pages/accounts/accounts.component'
import { AccountDialogEntryComponent } from './pages/accounts/components/account-dialog/account-dialog.component'
import { DnsComponent } from './pages/dns/dns.component'
import { DkimDialogEntryComponent } from './pages/domains/components/dkim-dialog/dkim-dialog.component'
import { DomainsComponent } from './pages/domains/domains.component'
import { ForwarderDialogEntryComponent } from './pages/forwarders/components/forwarder-dialog/forwarder-dialog.component'
import { ForwardersComponent } from './pages/forwarders/forwarders.component'
import { LoginComponent } from './pages/login/login.component'
import { ProfileComponent } from './pages/profile/profile.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      isFullscreen: true,
    },
  },
  {
    path: 'domains',
    component: DomainsComponent,
    data: {
      title: 'Domains',
    },
    children: [
      {
        path: ':domain/dkim/:action',
        component: DkimDialogEntryComponent,
      },
    ],
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    data: {
      title: 'Email Accounts',
    },
    children: [
      {
        path: ':id',
        component: AccountDialogEntryComponent,
      },
    ],
  },
  {
    path: 'forwarders',
    component: ForwardersComponent,
    data: {
      title: 'Forwarders',
    },
    children: [
      {
        path: ':id',
        component: ForwarderDialogEntryComponent,
      },
    ],
  },
  {
    path: 'dns',
    component: DnsComponent,
    data: {
      title: 'DNS Check',
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'Profile',
    },
  },
  {
    path: '**',
    redirectTo: 'accounts',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material'
import { ActivatedRouteSnapshot, Router, RoutesRecognized } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { NavCategory } from './app.interfaces'
import { AccountsComponent } from './pages/accounts/accounts.component'
import { AccountsService } from './pages/accounts/accounts.service'
import { DomainsComponent } from './pages/domains/domains.component'
import { DomainsService } from './pages/domains/domains.service'
import { ForwardersComponent } from './pages/forwarders/forwarders.component'
import { ForwardersService } from './pages/forwarders/forwarders.service'
import { ProfileService } from './pages/profile/profile.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public profileService: ProfileService,
    public domainsService: DomainsService,
    public forwardersService: ForwardersService,
    public accountsService: AccountsService,
  ) {}

  public title = 'DuckyPanel'
  public navCategories: NavCategory[] = [
    {
      title: 'Account management',
      items: [
        {
          name: 'Domains',
          icon: 'domain',
          routerLink: '/domains',
        },
        {
          name: 'Email Accounts',
          icon: 'email',
          routerLink: '/accounts',
        },
        {
          name: 'Forwarders',
          icon: 'send',
          routerLink: '/forwarders/',
        },
      ],
    },
    {
      title: 'Help',
      items: [
        {
          name: 'DNS records',
          icon: 'dns',
          routerLink: '/dns',
        },
      ],
    },
  ]

  @ViewChild('drawer', { static: true })
  private drawer: MatSidenav
  public isFullscreen: boolean
  public showRefreshButton = false
  public currentComponent: typeof ActivatedRouteSnapshot.prototype.component

  public ngOnInit(): void {
    this.profileService.getUserInfo()
    this.domainsService.getDomains()
    this.accountsService.getAccounts()
    this.forwardersService.getForwarders()

    this.router.events.subscribe((event): void => {
      if (event instanceof RoutesRecognized && event.state.root.firstChild) {
        const firstChild = event.state.root.firstChild
        this.isFullscreen = firstChild.data.isFullscreen ? true : false
        this.title = firstChild.data.title ? event.state.root.firstChild.data.title : 'DuckyPanel'

        this.currentComponent = firstChild.component

        switch (this.currentComponent) {
          case DomainsComponent:
          case AccountsComponent:
          case ForwardersComponent:
            this.showRefreshButton = true
            break

          default:
            this.showRefreshButton = false
        }
      }
    })
  }

  public refreshCurrentView(): void {
    switch (this.currentComponent) {
      case DomainsComponent:
        this.domainsService.getDomains()
        break

      case AccountsComponent:
        this.accountsService.getAccounts()
        break

      case ForwardersComponent:
        this.forwardersService.getForwarders()
        break

      default:
    }
  }

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result): boolean => result.matches))

  public closeDrawerConditional(): void {
    this.isHandset$.subscribe((isHandset$): void => {
      if (isHandset$) {
        this.drawer.close()
      }
    })
  }
}

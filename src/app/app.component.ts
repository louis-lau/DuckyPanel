import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material'
import { Router, RoutesRecognized } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { NavCategory } from './app.interfaces'
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
    private profileService: ProfileService,
  ) {}

  public title = 'DuckyPanel'
  public navCategories: NavCategory[] = [
    {
      title: 'General',
      items: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          routerLink: '/',
        },
      ],
    },
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
        {
          name: 'Support',
          icon: 'contact_support',
          href: 'https://mxroute.com/help.html',
        },
      ],
    },
  ]

  @ViewChild('drawer', { static: true })
  private drawer: MatSidenav
  public isFullscreen: boolean

  public ngOnInit(): void {
    this.profileService.getUserInfo()
    this.router.events.subscribe((event): void => {
      if (event instanceof RoutesRecognized && event.state.root.firstChild) {
        this.isFullscreen = event.state.root.firstChild.data.isFullscreen ? true : false
        this.title = event.state.root.firstChild.data.title ? event.state.root.firstChild.data.title : 'DuckyPanel'
      }
    })
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

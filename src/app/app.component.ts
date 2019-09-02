import { Component } from "@angular/core"
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { NavCategory } from "./app.interfaces"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public title = "DuckyPanel"
  public navCategories: NavCategory[] = [
    {
      title: "General",
      items: [
        {
          name: "Dashboard",
          icon: "dashboard",
          link: "/"
        }
      ]
    },
    {
      title: "Email account management",
      items: [
        {
          name: "Domains",
          icon: "domain",
          link: "/domains"
        },
        {
          name: "Email Accounts",
          icon: "email",
          link: "/accounts"
        },
        {
          name: "Filters",
          icon: "filter_list",
          link: "/filters"
        }
      ]
    },
    {
      title: "DNS",
      items: [
        {
          name: "MX & SPF",
          icon: "dns",
          link: "/dns"
        },
        {
          name: "DKIM",
          icon: "vpn_key",
          link: "/dns"
        }
      ]
    }
  ]

  public constructor(private breakpointObserver: BreakpointObserver) {}

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result): boolean => result.matches))
}

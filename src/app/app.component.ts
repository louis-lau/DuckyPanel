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
      title: "Address management",
      items: [
        {
          name: "Domains",
          icon: "domain",
          link: "/domains"
        },
        {
          name: "E-mail Accounts",
          icon: "email",
          link: "/addresses"
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
    .pipe(map(result => result.matches))
}

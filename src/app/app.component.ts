import { Component } from "@angular/core"
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public title = "MXroute-panel"

  public constructor(private breakpointObserver: BreakpointObserver) {}

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))
}

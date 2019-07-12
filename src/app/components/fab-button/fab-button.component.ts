import { Component, OnInit, Input } from "@angular/core"

@Component({
  selector: "app-fab-button",
  templateUrl: "./fab-button.component.html",
  styleUrls: ["./fab-button.component.scss"]
})
export class FabButtonComponent implements OnInit {
  @Input() public icon: string

  public constructor() {}

  public ngOnInit(): void {}
}

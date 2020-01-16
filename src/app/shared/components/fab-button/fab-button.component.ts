import { Component, Input } from "@angular/core"

@Component({
  selector: "app-fab-button",
  templateUrl: "./fab-button.component.html",
  styleUrls: ["./fab-button.component.scss"]
})
export class FabButtonComponent {
  @Input() public icon: string
}

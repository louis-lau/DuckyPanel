import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { DomainsComponent } from "./pages/domains/domains.component"

const routes: Routes = [
  {
    path: "domains",
    component: DomainsComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

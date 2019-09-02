import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Accounts } from "./accounts.interfaces"

@Injectable({
  providedIn: "root"
})
export class AccountsService {
  private apiURL = "http://localhost:3000/"

  public constructor(private http: HttpClient) {}

  public getAccounts(): Observable<Accounts[]> {
    return this.http.get<Accounts[]>(`${this.apiURL}accounts`)
  }
}

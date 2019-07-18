import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Addresses } from "./addresses.interfaces"

@Injectable({
  providedIn: "root"
})
export class AddressesService {
  private apiURL = "http://localhost:3000/"

  public constructor(private http: HttpClient) {}

  public getAddresses(): Observable<Addresses[]> {
    return this.http.get<Addresses[]>(`${this.apiURL}addresses`)
  }
}

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Config } from 'protractor'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: Config

  constructor(private http: HttpClient) {}

  loadConfig(): Config {
    return this.http
      .get<Config>(`./config/${environment.configFile}`)
      .toPromise()
      .then((config) => {
        this.config = config
      })
  }
}

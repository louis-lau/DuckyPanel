import { Injectable } from '@angular/core'
import { Domain, DomainsService as ApiDomainsService } from 'ducky-api-client-angular'
import { Subject, Subscription } from 'rxjs'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'

import { DomainWithAliasParentInfo } from './domains.interfaces'

@Injectable({
  providedIn: 'root',
})
export class DomainsService {
  constructor(private errorSnackbarService: ErrorSnackbarService, private apiDomainsService: ApiDomainsService) {}

  public domainsSubscription: Subscription
  public domains: Domain[]
  public domainsStrings: string[]
  public domainsAndAliases: DomainWithAliasParentInfo[]
  public domainsAndAliasesSubject: Subject<DomainWithAliasParentInfo[]> = new Subject()
  public domainsAndAliasesStrings: string[]

  public getDomains(): void {
    this.domainsSubscription = this.apiDomainsService.getDomains().subscribe(
      (domains: Domain[]): void => {
        this.domains = domains
        this.domainsStrings = domains.map((value): string => value.domain)

        // Assert domains as a different type so we can add "aliasOf"
        const assertedDomains = domains as DomainWithAliasParentInfo[]
        const domainsAndAliases: DomainWithAliasParentInfo[] = []

        for (const domain of assertedDomains) {
          domainsAndAliases.push(domain)
          if (domain.aliases && domain.aliases.length > 0) {
            for (const alias of domain.aliases) {
              alias.aliasOf = domain.domain
              domainsAndAliases.push(alias)
            }
          }
        }

        this.domainsAndAliases = domainsAndAliases
        this.domainsAndAliasesSubject.next(domainsAndAliases)
        this.domainsAndAliasesStrings = domainsAndAliases.map((value): string => value.domain)
      },
      (error) => {
        this.errorSnackbarService.open(error)
      },
    )
  }
}

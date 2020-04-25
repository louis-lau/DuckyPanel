import { Injectable } from '@angular/core'
import { AccountListItem, EmailAccountsService } from 'ducky-api-client-angular'
import { Subject, Subscription } from 'rxjs'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'
import { formatBytes } from 'src/app/shared/functions/formatBytes.function'

import { AccountListItemFormatted } from './accounts.interfaces'

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(
    private errorSnackbarService: ErrorSnackbarService,
    private readonly apiAccountsService: EmailAccountsService,
  ) {}

  public accountSubscription: Subscription
  public accountsFormatted: AccountListItemFormatted[]
  public accountsFormattedSubject: Subject<AccountListItemFormatted[]> = new Subject()

  public getAccounts(): void {
    this.accountSubscription = this.apiAccountsService.getAccounts().subscribe(
      (accounts: AccountListItem[]): void => {
        const accountsFormatted = accounts as AccountListItemFormatted[]

        // Convert quota bytes to human readable
        for (const accountFormatted of accountsFormatted) {
          accountFormatted.quotaAllowedFormatted = formatBytes(accountFormatted.quota.allowed)
          accountFormatted.quotaUsedFormatted = formatBytes(accountFormatted.quota.used)
        }

        this.accountsFormatted = accountsFormatted
        this.accountsFormattedSubject.next(accountsFormatted)
      },
      error => {
        this.errorSnackbarService.open(error)
      },
    )
  }
}

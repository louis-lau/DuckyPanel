import { Injectable } from '@angular/core'
import { Forwarder, ForwardersService as ApiForwardersService } from 'ducky-api-client-angular'
import { Subject, Subscription } from 'rxjs'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'

@Injectable({
  providedIn: 'root',
})
export class ForwardersService {
  constructor(
    private errorSnackbarService: ErrorSnackbarService,
    private readonly apiForwardersService: ApiForwardersService,
  ) {}

  public forwarderSubscription: Subscription
  public forwarders: Forwarder[]
  public forwardersSubject: Subject<Forwarder[]> = new Subject()

  public getForwarders(): void {
    this.forwarderSubscription = this.apiForwardersService.getForwarders().subscribe(
      (forwarders): void => {
        this.forwarders = forwarders
        this.forwardersSubject.next(forwarders)
      },
      error => {
        this.errorSnackbarService.open(error)
      },
    )
  }
}

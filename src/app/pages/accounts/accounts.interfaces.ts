import { AccountListItem } from 'ducky-api-client-angular'

export interface AccountListItemFormatted extends AccountListItem {
  quotaAllowedFormatted: string
  quotaUsedFormatted: string
}

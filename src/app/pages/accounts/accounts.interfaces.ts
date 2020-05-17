import { AccountListItem } from 'duckyapi-angular'

export interface AccountListItemFormatted extends AccountListItem {
  quotaAllowedFormatted: string
  quotaUsedFormatted: string
}

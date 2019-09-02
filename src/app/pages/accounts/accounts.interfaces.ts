export interface Accounts {
  id: string
  name: string
  address: string
  quotaAllowed: number | string
  quotaUsed: number | string
  disabled: boolean
}

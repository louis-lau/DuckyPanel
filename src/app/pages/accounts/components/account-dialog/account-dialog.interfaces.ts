interface AccountDetails {
  id: string
  name: string
  address: string
  spamLevel: number
  quota: {
    allowed: number
    used: number
  }
  disabledScopes: ("pop3" | "imap" | "smtp")[]
  disabled: boolean
}

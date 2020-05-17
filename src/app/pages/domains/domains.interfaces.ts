import { Domain, DomainAlias } from 'duckyapi-angular'

export interface AliasWithParentInfo extends DomainAlias {
  aliasOf?: string
}
export interface DomainWithAliasParentInfo extends Domain {
  aliases?: AliasWithParentInfo[]
}

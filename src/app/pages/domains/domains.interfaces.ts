import { Domain, DomainAlias } from 'ducky-api-client-angular'

export interface AliasWithParentInfo extends DomainAlias {
  aliasOf?: string
}
export interface DomainWithAliasParentInfo extends Domain {
  aliases?: AliasWithParentInfo[]
}

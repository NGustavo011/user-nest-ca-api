import { type Entity } from '../entities/entity'
import { type RepositoryInterface } from './repository-interface'

export type SortDirection = 'asc' | 'desc'

export interface SearchProps<Filter = string> {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
}

export class SearchParams {
  protected _page: number = 1
  protected _perPage: number = 15
  protected _sort: string | null = null
  protected _sortDir: SortDirection | null = null
  protected _filter: string | null = null
  constructor (props: SearchProps = {}) {
    this.page = props.page ?? this._page
    this.perPage = props.perPage ?? this._perPage
    this.sort = props.sort ?? this._sort
    this.sortDir = props.sortDir ?? this._sortDir
    this.filter = props.filter ?? this._filter
  }

  get page () {
    return this._page
  }

  private set page (value: number) {
    let _page = +value
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) { _page = this._page }
    this._page = _page
  }

  get perPage () {
    return this._perPage
  }

  private set perPage (value: number) {
    let _perPage = value === (true as any) ? this._perPage : +value
    if (Number.isNaN(_perPage) || _perPage <= 0 || parseInt(_perPage as any) !== _perPage) { _perPage = this._perPage }
    this._perPage = _perPage
  }

  get sort () {
    return this._sort
  }

  private set sort (value: string | null) {
    this._sort = value === null || value === undefined || value === '' ? null : `${value}`
  }

  get sortDir () {
    return this._sortDir
  }

  private set sortDir (value: string | null) {
    if (!this.sort) {
      this._sortDir = null
      return
    }
    if (!value) {
      this._sortDir = 'desc'
      return
    }
    const dir = `${value}`.toLowerCase()
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'desc' : dir
  }

  get filter () {
    return this._filter
  }

  private set filter (value: string | null) {
    this._filter = value === null || value === undefined || value === '' ? null : `${value}`
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SearchInput,
  SearchOutput
> extends RepositoryInterface<E> {
  search: (props: SearchParams) => Promise<SearchOutput>
}

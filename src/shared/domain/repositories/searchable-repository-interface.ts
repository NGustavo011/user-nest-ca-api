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

export interface SearchResultProps<E extends Entity, Filter> {
  items: E[]
  total: number
  currentPage: number
  perPage: number
  sort: string | null
  sortDir: SortDirection | null
  filter: Filter | null
}

export class SearchParams<Filter = string> {
  protected _page: number = 1
  protected _perPage: number = 15
  protected _sort: string | null = null
  protected _sortDir: SortDirection | null = null
  protected _filter: Filter | null = null
  constructor (props: SearchProps<Filter> = {}) {
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

  get filter (): Filter | null {
    return this._filter
  }

  private set filter (value: Filter | null) {
    this._filter = value === null || value === undefined || value === '' ? null : `${value as string}` as Filter
  }
}

export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[]
  readonly total: number
  readonly currentPage: number
  readonly perPage: number
  readonly sort: string | null
  readonly sortDir: SortDirection | null
  readonly filter: Filter | null
  readonly lastPage: number

  constructor (props: SearchResultProps<E, Filter>) {
    this.items = props.items
    this.total = props.total
    this.currentPage = props.currentPage
    this.perPage = props.perPage
    this.sort = props.sort
    this.sortDir = props.sortDir
    this.filter = props.filter
    this.lastPage = Math.ceil(this.total / this.perPage)
  }

  toJSON (forceEntity = false) {
    return {
      items: forceEntity ? this.items.map((item) => item.toJSON()) : this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      sort: this.sort,
      sortDir: this.sortDir,
      filter: this.filter,
      lastPage: this.lastPage

    }
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult<E, Filter>
> extends RepositoryInterface<E> {
  sortableFields: string[]
  search: (props: SearchInput) => Promise<SearchOutput>
}

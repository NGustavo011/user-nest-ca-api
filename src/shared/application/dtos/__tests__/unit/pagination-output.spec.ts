import { SearchResult } from '@/shared/domain/repositories/searchable-repository-interface'
import { PaginationOutputMapper } from '@/shared/application/dtos/pagination-output'

describe('PaginationOutputMapper unit tests', () => {
  it('Should convert a SearchResult in output', () => {
    const result = new SearchResult({
      items: ['fake'] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: null,
      sortDir: null,
      filter: ''
    })
    const sut = PaginationOutputMapper.toOutput(result.items, result)
    expect(sut).toStrictEqual({
      items: ['fake'],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1
    })
  })
})

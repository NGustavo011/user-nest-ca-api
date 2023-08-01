import { SearchParams } from '../../searchable-repository-interface'

describe('Searchable Repository unit tests', () => {
  describe('SearchParams tests', () => {
    it('Page prop', () => {
      const sut = new SearchParams()
      expect(sut.page).toBe(1)

      const params = [
        {
          page: null, expected: 1
        },
        {
          page: undefined, expected: 1
        },
        {
          page: '', expected: 1
        },
        {
          page: 'test', expected: 1
        },
        {
          page: 0, expected: 1
        },
        {
          page: -1, expected: 1
        },
        {
          page: -5.5, expected: 1
        },
        {
          page: true, expected: 1
        },
        {
          page: false, expected: 1
        },
        {
          page: {}, expected: 1
        },
        {
          page: 1, expected: 1
        },
        {
          page: 2, expected: 2
        }
      ]

      params.forEach(param => {
        expect(new SearchParams({ page: param.page as any }).page).toBe(param.expected)
      })
    })

    it('PerPage prop', () => {
      const sut = new SearchParams()
      expect(sut.perPage).toBe(15)

      const params = [
        {
          perPage: null, expected: 15
        },
        {
          perPage: undefined, expected: 15
        },
        {
          perPage: '', expected: 15
        },
        {
          perPage: 'test', expected: 15
        },
        {
          perPage: 0, expected: 15
        },
        {
          perPage: -1, expected: 15
        },
        {
          perPage: -5.5, expected: 15
        },
        {
          perPage: true, expected: 15
        },
        {
          perPage: false, expected: 15
        },
        {
          perPage: {}, expected: 15
        },
        {
          perPage: 1, expected: 1
        },
        {
          perPage: 2, expected: 2
        },
        {
          perPage: 25, expected: 25
        }
      ]

      params.forEach(param => {
        expect(new SearchParams({ perPage: param.perPage as any }).perPage).toBe(param.expected)
      })
    })

    it('Sort prop', () => {
      const sut = new SearchParams()
      expect(sut.sort).toBeNull()

      const params = [
        {
          sort: null, expected: null
        },
        {
          sort: undefined, expected: null
        },
        {
          sort: '', expected: null
        },
        {
          sort: 'test', expected: 'test'
        },
        {
          sort: 0, expected: '0'
        },
        {
          sort: -1, expected: '-1'
        },
        {
          sort: -5.5, expected: '-5.5'
        },
        {
          sort: true, expected: 'true'
        },
        {
          sort: false, expected: 'false'
        },
        {
          sort: {}, expected: '[object Object]'
        },
        {
          sort: 1, expected: '1'
        },
        {
          sort: 2, expected: '2'
        }
      ]

      params.forEach(param => {
        expect(new SearchParams({ sort: param.sort as any }).sort).toBe(param.expected)
      })
    })
  })
})

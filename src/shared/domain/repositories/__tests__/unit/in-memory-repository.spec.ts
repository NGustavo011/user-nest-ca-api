import { Entity } from '@/shared/domain/entities/entity'
import { InMemoryRepository } from '../../in-memory-repository'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

interface StubEntityProps {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {
}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  describe('Insert method', () => {
    it('Should insert a new entity', async () => {
      const entity = new StubEntity({ name: 'test', price: 50 })
      await sut.insert(entity)
      expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
    })
  })

  describe('FindById method', () => {
    it('Should throw error on findById when entity not found', async () => {
      await expect(sut.findById('fakeId')).rejects.toThrow(
        new NotFoundError('Entity not found')
      )
    })

    it('Should find a entity by id', async () => {
      const entity = new StubEntity({ name: 'test', price: 50 })
      await sut.insert(entity)
      const output = await sut.findById(entity.id)
      expect(entity.toJSON()).toStrictEqual(output.toJSON())
    })
  })

  describe('FindAll method', () => {
    it('Should find all entities', async () => {
      const entity = new StubEntity({ name: 'test', price: 50 })
      await sut.insert(entity)
      const output = await sut.findAll()
      expect(output).toStrictEqual([entity])
      expect(output.length).toBe(1)
    })
  })

  describe('Update method', () => {
    it('Should throw error on update when entity not found', async () => {
      const entity = new StubEntity({ name: 'test', price: 50 })
      await expect(sut.update(entity)).rejects.toThrow(
        new NotFoundError('Entity not found')
      )
    })

    it('Should update a entity', async () => {
      const entity = new StubEntity({ name: 'test', price: 50 })
      await sut.insert(entity)
      const entityUpdated = new StubEntity({ name: 'updated', price: 10 }, entity.id)
      await sut.update(entityUpdated)
      expect(entityUpdated.toJSON()).toStrictEqual(sut.items[0].toJSON())
    })
  })
})

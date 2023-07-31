import { Entity } from '../../entity'
import { validate as uuidValidate } from 'uuid'

interface StubProps {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {
}

describe('Entity unit tests', () => {
  it('Should set props and id', () => {
    const props: StubProps = {
      prop1: 'value',
      prop2: 15
    }
    const entity = new StubEntity(props)
    expect(entity.props).toStrictEqual(props)
    expect(entity._id).not.toBeNull()
    expect(uuidValidate(entity._id)).toBeTruthy()
  })

  it('Should accept a valid uuid', () => {
    const props: StubProps = {
      prop1: 'value',
      prop2: 15
    }
    const id = '2a858035-0bc5-4013-b722-e7b15621b593'
    const entity = new StubEntity(props, id)
    expect(uuidValidate(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id)
  })

  it('Should convert a entity to a Javascript Object', () => {
    const props: StubProps = {
      prop1: 'value',
      prop2: 15
    }
    const id = '2a858035-0bc5-4013-b722-e7b15621b593'
    const entity = new StubEntity(props, id)
    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props
    })
  })
})

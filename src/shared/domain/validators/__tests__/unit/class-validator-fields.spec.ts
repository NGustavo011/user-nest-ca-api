import { ClassValidatorFields } from '../../class-validator-fields'
import * as libClassValidator from 'class-validator/'

class StubClassValidatorFields extends ClassValidatorFields<{ field: string }> {
}

describe('ClassValidatorFields unit tests', () => {
  it('Should initialize errors and validateData variables with null', () => {
    const sut = new StubClassValidatorFields()
    expect(sut.errors).toEqual({})
    expect(sut.validatedData).toBeUndefined()
  })

  it('Should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValueOnce([
      {
        property: 'field', constraints: { isRequired: 'test error' }
      }
    ])
    const sut = new StubClassValidatorFields()
    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeUndefined()
    expect(sut.errors).toStrictEqual({ field: ['test error'] })
  })

  it('Should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValueOnce([
    ])
    const sut = new StubClassValidatorFields()
    expect(sut.validate({ field: 'value' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toStrictEqual({ field: 'value' })
    expect(sut.errors).toEqual({})
  })
})

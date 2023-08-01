import { validateSync } from 'class-validator'
import { type FieldsError, type ValidatorFieldsInterface } from './validator-fields-interface'

export abstract class ClassValidatorFields<PropsValidated> implements ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsError = {}
  validatedData: PropsValidated
  validate (data: any): boolean {
    const errors = validateSync(data)
    if (errors.length) {
      for (const error of errors) {
        const field = error.property
        this.errors[field] = Object.values(error.constraints as Record<string, string>)
      }
    } else {
      this.validatedData = data
    }
    return !errors.length
  }
}

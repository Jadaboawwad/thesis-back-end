import { registerEnumType } from 'type-graphql'

export enum ContractTypes {
  CONTRACTOR = 'Contractor',
  PERMENENT = 'Permenent',
  YEAR_1 = '1 year',
}

export enum Genders {
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum MaritalStatuses {
  SINGLE = 'Single',
  MARRIED = 'Married',
  DIVORCED = 'Divorced',
}

export enum Positions {
  BACK_END = 'Back-end',
  DEVOPS = 'DevOps',
  FRONT_END = 'Front-end',
  MANAGER = 'Manager',
  QA = 'QA',
  SOFTWARE_ENGINEER = 'Software Engineer',
}

registerEnumType(ContractTypes, {
  description: 'Employee contract type',
  name: 'ContractTypes',
})

registerEnumType(Genders, {
  description: 'Employee gender',
  name: 'Genders',
})

registerEnumType(MaritalStatuses, {
  description: 'Employee marital status',
  name: 'MaritalStatuses',
})

registerEnumType(Positions, {
  description: 'Employee position',
  name: 'Positions',
})

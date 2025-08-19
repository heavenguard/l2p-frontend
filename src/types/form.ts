export interface PersonalFormData {
  // Personal Information
  fullName: string
  birthDate: string
  birthPlace: string
  nationality: string
  resident: string
  ppe: string
  idNumber: string
  idIssuer: string
  idDate: string
  phone: string
  email: string
  address: string
  city: string
  profession: string
  employer: string
  maritalStatus: string
  children: number
  salary: number

  // Emergency Contacts
  contact1Name: string
  contact1Phone: string
  contact1Email: string
  contact1Relation: string
  contact2Name: string
  contact2Phone: string
  contact2Email: string
  contact2Relation: string

  // Account Types
  accountEpargne: boolean
  accountCourant: boolean
  accountNDjangui: boolean
  accountCheque: boolean
  accountPlacement: boolean

  // Signature
  signature: string
  termsAccepted: boolean
}

export interface JointFormData {
  // Account Type
  accountType: string

  // Cotitulaire 1
  holder1Name: string
  holder1Phone: string
  holder1Niu: string
  holder1Email: string
  holder1Address: string
  holder1Profession: string
  holder1Employer: string
  holder1IdNumber: string
  holder1IdIssuer: string
  holder1IdDate: string

  // Cotitulaire 2
  holder2Name: string
  holder2Phone: string
  holder2Niu: string
  holder2Email: string
  holder2Address: string
  holder2Profession: string
  holder2Employer: string
  holder2IdNumber: string
  holder2IdIssuer: string
  holder2IdDate: string

  // Signature Requirements
  signatureType: string

  // Account Types
  accountEpargne: boolean
  accountCourant: boolean
  accountNDjangui: boolean
  accountCheque: boolean
  accountPlacement: boolean

  // Signatures
  signature1: string
  signature2: string
  declaration: boolean
  terms1Accepted: boolean
  terms2Accepted: boolean
}
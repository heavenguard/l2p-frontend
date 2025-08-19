"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { User, Phone, Briefcase, Users, CreditCard, PenTool, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "@/lib/useTranslations"

interface PersonalFormData {
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

interface FormErrors {
  [key: string]: string
}

interface PersonalAccountFormProps {
  onSubmit: (data: PersonalFormData) => void
  isSubmitting: boolean
}

const Step = ({
  title,
  icon,
  isActive,
  children,
}: { title: string; icon: React.ReactNode; isActive: boolean; children: React.ReactNode }) => {
  if (!isActive) return null

  return (
    <Card className="border-2 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          {icon}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {children}
      </CardContent>
    </Card>
  )
}

export default function PersonalAccountForm({ onSubmit, isSubmitting }: PersonalAccountFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
    const t = useTranslations('registration')
    const g = useTranslations()
  
  const [formData, setFormData] = useState<PersonalFormData>({
    fullName: "",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    resident: "",
    ppe: "",
    idNumber: "",
    idIssuer: "",
    idDate: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    profession: "",
    employer: "",
    maritalStatus: "",
    children: 0,
    salary: 0,
    contact1Name: "",
    contact1Phone: "",
    contact1Email: "",
    contact1Relation: "",
    contact2Name: "",
    contact2Phone: "",
    contact2Email: "",
    contact2Relation: "",
    accountEpargne: false,
    accountCourant: false,
    accountNDjangui: false,
    accountCheque: false,
    accountPlacement: false,
    signature: "",
    termsAccepted: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const signatureRef = useRef<HTMLCanvasElement>(null)

  const steps = [
    { key: "personalInfo", title: t("steps.personalInfo"), icon: <User className="h-5 w-5 text-blue-600" /> },
    { key: "contactInfo", title: t("steps.contactInfo"), icon: <Phone className="h-5 w-5 text-blue-600" /> },
    {
      key: "professionalInfo",
      title: t("steps.professionalInfo"),
      icon: <Briefcase className="h-5 w-5 text-blue-600" />,
    },
    {
      key: "emergencyContacts",
      title: t("steps.emergencyContacts"),
      icon: <Users className="h-5 w-5 text-blue-600" />,
    },
    { key: "accountTypes", title: t("steps.accountTypes"), icon: <CreditCard className="h-5 w-5 text-blue-600" /> },
    { key: "signature", title: t("steps.signature"), icon: <PenTool className="h-5 w-5 text-blue-600" /> },
  ]

  const totalSteps = steps.length

  const handleInputChange = (field: keyof PersonalFormData, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateCurrentStep = (): boolean => {
    const newErrors: FormErrors = {}

    switch (currentStep) {
      case 0: // Personal Information
        if (!formData.fullName.trim()) newErrors.fullName = "Noms et Prénoms requis"
        if (!formData.birthDate) newErrors.birthDate = "Date de naissance requise"
        if (!formData.birthPlace.trim()) newErrors.birthPlace = "Lieu de naissance requis"
        if (!formData.nationality.trim()) newErrors.nationality = "Nationalité requise"
        if (!formData.resident) newErrors.resident = "Statut de résident requis"
        if (!formData.ppe) newErrors.ppe = "Statut PPE requis"
        if (!formData.idNumber.trim()) newErrors.idNumber = "Numéro d'identité requis"
        if (!formData.idDate) newErrors.idDate = "Date d'émission requise"
        break
      case 1: // Contact Information
        if (!formData.phone.trim()) newErrors.phone = "Téléphone requis"
        if (!formData.email.trim()) newErrors.email = "Email requis"
        if (!formData.address.trim()) newErrors.address = "Adresse requise"
        if (!formData.city.trim()) newErrors.city = "Ville/Quartier requis"
        break
      case 2: // Professional Information
        if (!formData.profession.trim()) newErrors.profession = "Profession requise"
        break
      case 5: // Signature
        if (!formData.termsAccepted) newErrors.termsAccepted = "Vous devez accepter les conditions"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateCurrentStep()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{steps[currentStep]?.title}</span>
          <span className="text-sm text-gray-500">
            {currentStep + 1} / {totalSteps}
          </span>
        </div>
        <Progress value={((currentStep + 1) / totalSteps) * 100} className="w-full" />
      </div>

      {/* Personal Information Step */}
      <Step
        title={t("steps.personalInfo")}
        icon={<User className="h-5 w-5 text-blue-600" />}
        isActive={currentStep === 0}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">{t("fields.fullName")} *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={errors.fullName ? "border-destructive" : ""}
            />
            {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <Label htmlFor="birthDate">{t("fields.birthDate")} *</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleInputChange("birthDate", e.target.value)}
              className={errors.birthDate ? "border-destructive" : ""}
            />
            {errors.birthDate && <p className="text-sm text-destructive mt-1">{errors.birthDate}</p>}
          </div>

          <div>
            <Label htmlFor="birthPlace">{t("fields.birthPlace")} *</Label>
            <Input
              id="birthPlace"
              value={formData.birthPlace}
              onChange={(e) => handleInputChange("birthPlace", e.target.value)}
              className={errors.birthPlace ? "border-destructive" : ""}
            />
            {errors.birthPlace && <p className="text-sm text-destructive mt-1">{errors.birthPlace}</p>}
          </div>

          <div>
            <Label htmlFor="nationality">{t("fields.nationality")} *</Label>
            <Input
              id="nationality"
              value={formData.nationality}
              onChange={(e) => handleInputChange("nationality", e.target.value)}
              className={errors.nationality ? "border-destructive" : ""}
            />
            {errors.nationality && <p className="text-sm text-destructive mt-1">{errors.nationality}</p>}
          </div>

          <div>
            <Label htmlFor="resident">{t("fields.resident")} *</Label>
            <Select value={formData.resident} onValueChange={(value) => handleInputChange("resident", value)}>
              <SelectTrigger className={errors.resident ? "border-destructive" : ""}>
                <SelectValue placeholder={g("common.select")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">{g("common.yes")}</SelectItem>
                <SelectItem value="no">{g("common.no")}</SelectItem>
              </SelectContent>
            </Select>
            {errors.resident && <p className="text-sm text-destructive mt-1">{errors.resident}</p>}
          </div>

          <div>
            <Label htmlFor="ppe">{t("fields.ppe")} *</Label>
            <Select value={formData.ppe} onValueChange={(value) => handleInputChange("ppe", value)}>
              <SelectTrigger className={errors.ppe ? "border-destructive" : ""}>
                <SelectValue placeholder={g("common.select")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">{g("common.yes")}</SelectItem>
                <SelectItem value="no">{g("common.no")}</SelectItem>
              </SelectContent>
            </Select>
            {errors.ppe && <p className="text-sm text-destructive mt-1">{errors.ppe}</p>}
          </div>

          <div>
            <Label htmlFor="idNumber">{t("fields.idNumber")} *</Label>
            <Input
              id="idNumber"
              value={formData.idNumber}
              onChange={(e) => handleInputChange("idNumber", e.target.value)}
              className={errors.idNumber ? "border-destructive" : ""}
            />
            {errors.idNumber && <p className="text-sm text-destructive mt-1">{errors.idNumber}</p>}
          </div>

          <div>
            <Label htmlFor="idIssuer">{t("fields.idIssuer")}</Label>
            <Input
              id="idIssuer"
              value={formData.idIssuer}
              onChange={(e) => handleInputChange("idIssuer", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="idDate">{t("fields.idDate")} *</Label>
            <Input
              id="idDate"
              type="date"
              value={formData.idDate}
              onChange={(e) => handleInputChange("idDate", e.target.value)}
              className={errors.idDate ? "border-destructive" : ""}
            />
            {errors.idDate && <p className="text-sm text-destructive mt-1">{errors.idDate}</p>}
          </div>
        </div>
      </Step>

      {/* Contact Information Step */}
      <Step
        title={t("steps.contactInfo")}
        icon={<Phone className="h-5 w-5 text-blue-600" />}
        isActive={currentStep === 1}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">{t("fields.phone")} *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
          </div>

          <div>
            <Label htmlFor="email">{t("fields.email")} *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="address">{t("fields.address")} *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={errors.address ? "border-destructive" : ""}
            />
            {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
          </div>

          <div>
            <Label htmlFor="city">{t("fields.city")} *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className={errors.city ? "border-destructive" : ""}
            />
            {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
          </div>
        </div>
      </Step>

      {/* Professional Information Step */}
      <Step
        title={t("steps.professionalInfo")}
        icon={<Briefcase className="h-5 w-5 text-blue-600" />}
        isActive={currentStep === 2}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="profession">{t("fields.profession")} *</Label>
            <Input
              id="profession"
              value={formData.profession}
              onChange={(e) => handleInputChange("profession", e.target.value)}
              className={errors.profession ? "border-destructive" : ""}
            />
            {errors.profession && <p className="text-sm text-destructive mt-1">{errors.profession}</p>}
          </div>

          <div>
            <Label htmlFor="employer">{t("fields.employer")}</Label>
            <Input
              id="employer"
              value={formData.employer}
              onChange={(e) => handleInputChange("employer", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="maritalStatus">{t("fields.maritalStatus")}</Label>
            <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
              <SelectTrigger>
                <SelectValue placeholder={g("common.select")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">{t("maritalStatus.single")}</SelectItem>
                <SelectItem value="married">{t("maritalStatus.married")}</SelectItem>
                <SelectItem value="divorced">{t("maritalStatus.divorced")}</SelectItem>
                <SelectItem value="widowed">{t("maritalStatus.widowed")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="children">{t("fields.children")}</Label>
            <Input
              id="children"
              type="number"
              min="0"
              value={formData.children}
              onChange={(e) => handleInputChange("children", Number.parseInt(e.target.value) || 0)}
            />
          </div>

          <div>
            <Label htmlFor="salary">{t("fields.salary")}</Label>
            <Input
              id="salary"
              type="number"
              min="0"
              value={formData.salary}
              onChange={(e) => handleInputChange("salary", Number.parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </Step>

      {/* Emergency Contacts Step */}
      <Step
        title={t("steps.emergencyContacts")}
        icon={<Users className="h-5 w-5 text-blue-600" />}
        isActive={currentStep === 3}
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">{t("fields.contact1")}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact1Name">{t("fields.contactName")}</Label>
                <Input
                  id="contact1Name"
                  value={formData.contact1Name}
                  onChange={(e) => handleInputChange("contact1Name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact1Phone">{t("fields.contactPhone")}</Label>
                <Input
                  id="contact1Phone"
                  value={formData.contact1Phone}
                  onChange={(e) => handleInputChange("contact1Phone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact1Email">{t("fields.contactEmail")}</Label>
                <Input
                  id="contact1Email"
                  type="email"
                  value={formData.contact1Email}
                  onChange={(e) => handleInputChange("contact1Email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact1Relation">{t("fields.contactRelation")}</Label>
                <Input
                  id="contact1Relation"
                  value={formData.contact1Relation}
                  onChange={(e) => handleInputChange("contact1Relation", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">{t("fields.contact2")}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact2Name">{t("fields.contactName")}</Label>
                <Input
                  id="contact2Name"
                  value={formData.contact2Name}
                  onChange={(e) => handleInputChange("contact2Name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact2Phone">{t("fields.contactPhone")}</Label>
                <Input
                  id="contact2Phone"
                  value={formData.contact2Phone}
                  onChange={(e) => handleInputChange("contact2Phone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact2Email">{t("fields.contactEmail")}</Label>
                <Input
                  id="contact2Email"
                  type="email"
                  value={formData.contact2Email}
                  onChange={(e) => handleInputChange("contact2Email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact2Relation">{t("fields.contactRelation")}</Label>
                <Input
                  id="contact2Relation"
                  value={formData.contact2Relation}
                  onChange={(e) => handleInputChange("contact2Relation", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </Step>

      {/* Account Types Step */}
      <Step
        title={t("steps.accountTypes")}
        icon={<CreditCard className="h-5 w-5 text-blue-600" />}
        isActive={currentStep === 4}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">{t("fields.selectAccountTypes")}</p>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="accountEpargne"
                checked={formData.accountEpargne}
                onCheckedChange={(checked) => handleInputChange("accountEpargne", checked as boolean)}
              />
              <Label htmlFor="accountEpargne">{t("accountTypes.epargne")}</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="accountCourant"
                checked={formData.accountCourant}
                onCheckedChange={(checked) => handleInputChange("accountCourant", checked as boolean)}
              />
              <Label htmlFor="accountCourant">{t("accountTypes.courant")}</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="accountNDjangui"
                checked={formData.accountNDjangui}
                onCheckedChange={(checked) => handleInputChange("accountNDjangui", checked as boolean)}
              />
              <Label htmlFor="accountNDjangui">{t("accountTypes.ndjangui")}</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="accountCheque"
                checked={formData.accountCheque}
                onCheckedChange={(checked) => handleInputChange("accountCheque", checked as boolean)}
              />
              <Label htmlFor="accountCheque">{t("accountTypes.cheque")}</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="accountPlacement"
                checked={formData.accountPlacement}
                onCheckedChange={(checked) => handleInputChange("accountPlacement", checked as boolean)}
              />
              <Label htmlFor="accountPlacement">{t("accountTypes.placement")}</Label>
            </div>
          </div>
        </div>
      </Step>

      {/* Signature Step */}
      <Step
        title={t("steps.signature")}
        icon={<PenTool className="h-5 w-5 text-blue-600" />}
        isActive={currentStep === 5}
      >
        <div className="space-y-6">
          <div>
            <Label>{t("fields.signature")}</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <canvas
                ref={signatureRef}
                width={400}
                height={200}
                className="border border-gray-200 rounded mx-auto cursor-crosshair"
                style={{ touchAction: "none" }}
              />
              <p className="text-sm text-gray-500 mt-2">{t("fields.signatureInstruction")}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="termsAccepted"
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
            />
            <Label htmlFor="termsAccepted" className="text-sm">
              {t("fields.acceptTerms")} *
            </Label>
          </div>
          {errors.termsAccepted && <p className="text-sm text-destructive">{errors.termsAccepted}</p>}
        </div>
      </Step>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2 bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("navigation.previous")}
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button type="button" onClick={nextStep} className="flex items-center gap-2">
            {t("navigation.next")}
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            {isSubmitting ? g("common.submitting") : g("common.submit")}
          </Button>
        )}
      </div>
    </form>
  )
}

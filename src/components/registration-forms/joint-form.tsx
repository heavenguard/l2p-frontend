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
import { CreditCard, User, Users, PenTool, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "@/lib/useTranslations"

interface JointFormData {
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

interface FormErrors {
  [key: string]: string
}

interface JointAccountFormProps {
  onSubmit: (data: JointFormData) => void
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

export default function JointAccountForm({onSubmit, isSubmitting }: JointAccountFormProps) {
    const t = useTranslations('registration')
    const g = useTranslations()

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<JointFormData>({
    accountType: "",
    holder1Name: "",
    holder1Phone: "",
    holder1Niu: "",
    holder1Email: "",
    holder1Address: "",
    holder1Profession: "",
    holder1Employer: "",
    holder1IdNumber: "",
    holder1IdIssuer: "",
    holder1IdDate: "",
    holder2Name: "",
    holder2Phone: "",
    holder2Niu: "",
    holder2Email: "",
    holder2Address: "",
    holder2Profession: "",
    holder2Employer: "",
    holder2IdNumber: "",
    holder2IdIssuer: "",
    holder2IdDate: "",
    signatureType: "",
    accountEpargne: false,
    accountCourant: false,
    accountNDjangui: false,
    accountCheque: false,
    accountPlacement: false,
    signature1: "",
    signature2: "",
    declaration: false,
    terms1Accepted: false,
    terms2Accepted: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const signatureRef1 = useRef<HTMLCanvasElement>(null)
  const signatureRef2 = useRef<HTMLCanvasElement>(null)

  const steps = [
    { key: "accountType", title: t("steps.accountType"), icon: <CreditCard className="h-5 w-5 text-blue-600" /> },
    { key: "holder1Info", title: t("steps.holder1Info"), icon: <User className="h-5 w-5 text-blue-600" /> },
    { key: "holder2Info", title: t("steps.holder2Info"), icon: <Users className="h-5 w-5 text-blue-600" /> },
    { key: "accountTypes", title: t("steps.accountTypes"), icon: <CreditCard className="h-5 w-5 text-blue-600" /> },
    { key: "signatures", title: t("steps.signatures"), icon: <PenTool className="h-5 w-5 text-blue-600" /> },
  ]

  const totalSteps = steps.length

  const handleInputChange = (field: keyof JointFormData, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateCurrentStep = (): boolean => {
    const newErrors: FormErrors = {}

    switch (currentStep) {
      case 0: // Account Type
        if (!formData.accountType) newErrors.accountType = "Type de compte requis"
        if (!formData.signatureType) newErrors.signatureType = "Type de signature requis"
        break
      case 1: // Holder 1
        if (!formData.holder1Name.trim()) newErrors.holder1Name = "Nom du cotitulaire 1 requis"
        if (!formData.holder1Phone.trim()) newErrors.holder1Phone = "Téléphone requis"
        if (!formData.holder1Email.trim()) newErrors.holder1Email = "Email requis"
        break
      case 2: // Holder 2
        if (!formData.holder2Name.trim()) newErrors.holder2Name = "Nom du cotitulaire 2 requis"
        if (!formData.holder2Phone.trim()) newErrors.holder2Phone = "Téléphone requis"
        if (!formData.holder2Email.trim()) newErrors.holder2Email = "Email requis"
        break
      case 4: // Signatures
        if (!formData.declaration) newErrors.declaration = "Déclaration requise"
        if (!formData.terms1Accepted) newErrors.terms1Accepted = "Acceptation des conditions requise"
        if (!formData.terms2Accepted) newErrors.terms2Accepted = "Acceptation des conditions requise"
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

      {/* Account Type Step */}
      <Step
        title={t("steps.accountType")}
        icon={<CreditCard className="h-5 w-5 text-blue-600" />}
        isActive={currentStep === 0}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="accountType">{t("fields.accountType")} *</Label>
            <Select value={formData.accountType} onValueChange={(value) => handleInputChange("accountType", value)}>
              <SelectTrigger className={errors.accountType ? "border-destructive" : ""}>
                <SelectValue placeholder={g("common.select")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="joint-or">{t("jointAccountTypes.jointOr")}</SelectItem>
                <SelectItem value="joint-and">{t("jointAccountTypes.jointAnd")}</SelectItem>
              </SelectContent>
            </Select>
            {errors.accountType && <p className="text-sm text-destructive mt-1">{errors.accountType}</p>}
          </div>

          <div>
            <Label htmlFor="signatureType">{t("fields.signatureType")} *</Label>
            <Select value={formData.signatureType} onValueChange={(value) => handleInputChange("signatureType", value)}>
              <SelectTrigger className={errors.signatureType ? "border-destructive" : ""}>
                <SelectValue placeholder={g("common.select")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">{t("signatureTypes.individual")}</SelectItem>
                <SelectItem value="joint">{t("signatureTypes.joint")}</SelectItem>
              </SelectContent>
            </Select>
            {errors.signatureType && <p className="text-sm text-destructive mt-1">{errors.signatureType}</p>}
          </div>
        </div>
      </Step>

      {/* Holder 1 Information Step */}
      <Step
        title={t("steps.holder1Info")}
        icon={<User className="h-5 w-5 text-blue-600" />}
        isActive={currentStep === 1}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="holder1Name">{t("fields.holder1Name")} *</Label>
            <Input
              id="holder1Name"
              value={formData.holder1Name}
              onChange={(e) => handleInputChange("holder1Name", e.target.value)}
              className={errors.holder1Name ? "border-destructive" : ""}
            />
            {errors.holder1Name && <p className="text-sm text-destructive mt-1">{errors.holder1Name}</p>}
          </div>

          <div>
            <Label htmlFor="holder1Phone">{t("fields.holder1Phone")} *</Label>
            <Input
              id="holder1Phone"
              value={formData.holder1Phone}
              onChange={(e) => handleInputChange("holder1Phone", e.target.value)}
              className={errors.holder1Phone ? "border-destructive" : ""}
            />
            {errors.holder1Phone && <p className="text-sm text-destructive mt-1">{errors.holder1Phone}</p>}
          </div>

          <div>
            <Label htmlFor="holder1Niu">{t("fields.holder1Niu")}</Label>
            <Input
              id="holder1Niu"
              value={formData.holder1Niu}
              onChange={(e) => handleInputChange("holder1Niu", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="holder1Email">{t("fields.holder1Email")} *</Label>
            <Input
              id="holder1Email"
              type="email"
              value={formData.holder1Email}
              onChange={(e) => handleInputChange("holder1Email", e.target.value)}
              className={errors.holder1Email ? "border-destructive" : ""}
            />
            {errors.holder1Email && <p className="text-sm text-destructive mt-1">{errors.holder1Email}</p>}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="holder1Address">{t("fields.holder1Address")}</Label>
            <Input
              id="holder1Address"
              value={formData.holder1Address}
              onChange={(e) => handleInputChange("holder1Address", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="holder1Profession">{t("fields.holder1Profession")}</Label>
            <Input
              id="holder1Profession"
              value={formData.holder1Profession}
              onChange={(e) => handleInputChange("holder1Profession", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="holder1Employer">{t("fields.holder1Employer")}</Label>
            <Input
              id="holder1Employer"
              value={formData.holder1Employer}
              onChange={(e) => handleInputChange("holder1Employer", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="holder1IdNumber">{t("fields.holder1IdNumber")}</Label>
            <Input
              id="holder1IdNumber"
              value={formData.holder1IdNumber}
              onChange={(e) => handleInputChange("holder1IdNumber", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="holder1IdIssuer">{t("fields.holder1IdIssuer")}</Label>
            <Input
              id="holder1IdIssuer"
              value={formData.holder1IdIssuer}
              onChange={(e) => handleInputChange("holder1IdIssuer", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="holder1IdDate">{t("fields.holder1IdDate")}</Label>
            <Input
              id="holder1IdDate"
              type="date"
              value={formData.holder1IdDate}
              onChange={(e) => handleInputChange("holder1IdDate", e.target.value)}
            />
          </div>
        </div>
      </Step>

      {/* Holder 2 Information Step */}
      <Step
        title={t("steps.holder2Info")}
        icon={<Users className="h-5 w-5 text-blue-600" />}
        isActive={currentStep === 2}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="holder2Name">{t("fields.holder2Name")} *</Label>
            <Input
              id="holder2Name"
              value={formData.holder2Name}
              onChange={(e) => handleInputChange("holder2Name", e.target.value)}
              className={errors.holder2Name ? "border-destructive" : ""}
            />
            {errors.holder2Name && <p className="text-sm text-destructive mt-1">{errors.holder2Name}</p>}
          </div>

          <div>
            <Label htmlFor="holder2Phone">{t("fields.holder2Phone")} *</Label>
            <Input
              id="holder2Phone"
              value={formData.holder2Phone}
              onChange={(e) => handleInputChange("holder2Phone", e.target.value)}
              className={errors.holder2Phone ? "border-destructive" : ""}
            />
            {errors.holder2Phone && <p className="text-sm text-destructive mt-1">{errors.holder2Phone}</p>}
          </div>

          <div>
            <Label htmlFor="holder2Niu">{t("fields.holder2Niu")}</Label>
            <Input
              id="holder2Niu"
              value={formData.holder2Niu}
              onChange={(e) => handleInputChange("holder2Niu", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="holder2Email">{t("fields.holder2Email")} *</Label>
            <Input
              id="holder2Email"
              type="email"
              value={formData.holder2Email}
              onChange={(e) => handleInputChange("holder2Email", e.target.value)}
              className={errors.holder2Email ? "border-destructive" : ""}
            />
            {errors.holder2Email && <p className="text-sm text-destructive mt-1">{errors.holder2Email}</p>}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="holder2Address">{t("fields.holder2Address")}</Label>
            <Input
              id="holder2Address"
              value={formData.holder2Address}
              onChange={(e) => handleInputChange("holder2Address", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="holder2Profession">{t("fields.holder2Profession")}</Label>
            <Input
              id="holder2Profession"
              value={formData.holder2Profession}
              onChange={(e) => handleInputChange("holder2Profession", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="holder2Employer">{t("fields.holder2Employer")}</Label>
            <Input
              id="holder2Employer"
              value={formData.holder2Employer}
              onChange={(e) => handleInputChange("holder2Employer", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="holder2IdNumber">{t("fields.holder2IdNumber")}</Label>
            <Input
              id="holder2IdNumber"
              value={formData.holder2IdNumber}
              onChange={(e) => handleInputChange("holder2IdNumber", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="holder2IdIssuer">{t("fields.holder2IdIssuer")}</Label>
            <Input
              id="holder2IdIssuer"
              value={formData.holder2IdIssuer}
              onChange={(e) => handleInputChange("holder2IdIssuer", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="holder2IdDate">{t("fields.holder2IdDate")}</Label>
            <Input
              id="holder2IdDate"
              type="date"
              value={formData.holder2IdDate}
              onChange={(e) => handleInputChange("holder2IdDate", e.target.value)}
            />
          </div>
        </div>
      </Step>

      {/* Account Types Step */}
      <Step
        title={t("steps.accountTypes")}
        icon={<CreditCard className="h-5 w-5 text-blue-600" />}
        isActive={currentStep === 3}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">{t("fields.selectAccountTypes")}</p>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="jointAccountEpargne"
                checked={formData.accountEpargne}
                onCheckedChange={(checked) => handleInputChange("accountEpargne", checked as boolean)}
              />
              <Label htmlFor="jointAccountEpargne">{t("accountTypes.epargne")}</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="jointAccountCourant"
                checked={formData.accountCourant}
                onCheckedChange={(checked) => handleInputChange("accountCourant", checked as boolean)}
              />
              <Label htmlFor="jointAccountCourant">{t("accountTypes.courant")}</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="jointAccountNDjangui"
                checked={formData.accountNDjangui}
                onCheckedChange={(checked) => handleInputChange("accountNDjangui", checked as boolean)}
              />
              <Label htmlFor="jointAccountNDjangui">{t("accountTypes.ndjangui")}</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="jointAccountCheque"
                checked={formData.accountCheque}
                onCheckedChange={(checked) => handleInputChange("accountCheque", checked as boolean)}
              />
              <Label htmlFor="jointAccountCheque">{t("accountTypes.cheque")}</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="jointAccountPlacement"
                checked={formData.accountPlacement}
                onCheckedChange={(checked) => handleInputChange("accountPlacement", checked as boolean)}
              />
              <Label htmlFor="jointAccountPlacement">{t("accountTypes.placement")}</Label>
            </div>
          </div>
        </div>
      </Step>

      {/* Signatures Step */}
      <Step
        title={t("steps.signatures")}
        icon={<PenTool className="h-5 w-5 text-blue-600" />}
        isActive={currentStep === 4}
      >
        <div className="space-y-6">
          <div>
            <Label>{t("fields.signature1")}</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <canvas
                ref={signatureRef1}
                width={400}
                height={200}
                className="border border-gray-200 rounded mx-auto cursor-crosshair"
                style={{ touchAction: "none" }}
              />
              <p className="text-sm text-gray-500 mt-2">{t("fields.signatureInstruction")}</p>
            </div>
          </div>

          <div>
            <Label>{t("fields.signature2")}</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <canvas
                ref={signatureRef2}
                width={400}
                height={200}
                className="border border-gray-200 rounded mx-auto cursor-crosshair"
                style={{ touchAction: "none" }}
              />
              <p className="text-sm text-gray-500 mt-2">{t("fields.signatureInstruction")}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="declaration"
                checked={formData.declaration}
                onCheckedChange={(checked) => handleInputChange("declaration", checked as boolean)}
              />
              <Label htmlFor="declaration" className="text-sm">
                {t("fields.declaration")} *
              </Label>
            </div>
            {errors.declaration && <p className="text-sm text-destructive">{errors.declaration}</p>}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms1Accepted"
                checked={formData.terms1Accepted}
                onCheckedChange={(checked) => handleInputChange("terms1Accepted", checked as boolean)}
              />
              <Label htmlFor="terms1Accepted" className="text-sm">
                {t("fields.terms1Accepted")} *
              </Label>
            </div>
            {errors.terms1Accepted && <p className="text-sm text-destructive">{errors.terms1Accepted}</p>}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms2Accepted"
                checked={formData.terms2Accepted}
                onCheckedChange={(checked) => handleInputChange("terms2Accepted", checked as boolean)}
              />
              <Label htmlFor="terms2Accepted" className="text-sm">
                {t("fields.terms2Accepted")} *
              </Label>
            </div>
            {errors.terms2Accepted && <p className="text-sm text-destructive">{errors.terms2Accepted}</p>}
          </div>
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

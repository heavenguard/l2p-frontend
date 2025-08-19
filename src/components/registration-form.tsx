"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PersonalFormData, JointFormData } from "@/types/form"
import SignatureField from "./signature"
import PersonalAccountForm from "./registration-forms/personal-form"
import JointAccountForm from "./registration-forms/joint-form"
import { useTranslations } from "@/lib/useTranslations"

interface FormErrors {
  [key: string]: string
}

export function BankRegistrationForm() {
  const [language, setLanguage] = useState<"fr" | "en">("fr")
  const [activeTab, setActiveTab] = useState<"personal" | "joint">("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations('registration')

  const handleTabChange = (value: string) => {
    setActiveTab(value as "personal" | "joint")
  }

  const handlePersonalSubmit = async (data: any) => {
    setIsSubmitting(true)
    console.log("Personal Account Registration:", data)

    setTimeout(() => {
      setIsSubmitting(false)
      alert("Inscription réussie! Votre demande a été soumise.")
    }, 2000)
  }

  const handleJointSubmit = async (data: any) => {
    setIsSubmitting(true)
    console.log("Joint Account Registration:", data)

    setTimeout(() => {
      setIsSubmitting(false)
      alert("Inscription réussie! Votre demande a été soumise.")
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">L2P Finance</h1>
          <p className="text-gray-600">Ouverture de Compte Bancaire</p>
        </div>
        <Button variant="outline" onClick={() => setLanguage(language === "fr" ? "en" : "fr")} className="text-sm">
          {t("navigation.languageSwitch")}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">{t("navigation.personalAccount")}</TabsTrigger>
          <TabsTrigger value="joint">{t("navigation.jointAccount")}</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <PersonalAccountForm onSubmit={handlePersonalSubmit} isSubmitting={isSubmitting} />
        </TabsContent>

        <TabsContent value="joint" className="space-y-6">
          <JointAccountForm onSubmit={handleJointSubmit} isSubmitting={isSubmitting} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
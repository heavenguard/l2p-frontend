import { BankRegistrationForm } from "@/components/registration-form"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Ouverture de Compte</h1>
          <p className="text-muted-foreground">Choisissez le type de compte et remplissez les informations requises</p>
        </div>
        <BankRegistrationForm />
      </div>
    </main>
  )
}

import SignInForm from "@/components/auth/SignInForm"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignInForm />
    </div>
  )
}

export const metadata = {
  title: "Masuk - SEA Catering",
  description: "Masuk ke akun SEA Catering Anda",
} 
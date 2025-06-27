import SignUpForm from "@/components/auth/SignUpForm"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignUpForm />
    </div>
  )
}

export const metadata = {
  title: "Daftar - SEA Catering",
  description: "Buat akun SEA Catering baru",
} 
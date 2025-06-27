"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { FaGoogle, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa"

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)


  const passwordValidation = {
    minLength: formData.password.length >= 6,
    hasNumber: /\d/.test(formData.password),
    hasLetter: /[a-zA-Z]/.test(formData.password),
  }

  const isPasswordValid = Object.values(passwordValidation).every(Boolean)
  const passwordsMatch = formData.password === formData.confirmPassword

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!isPasswordValid) {
      setError("Password harus memenuhi semua kriteria")
      setIsLoading(false)
      return
    }

    if (!passwordsMatch) {
      setError("Konfirmasi password tidak cocok")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Terjadi kesalahan")
        return
      }

      setSuccess(true)
      // Auto sign in after successful registration
      setTimeout(async () => {
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          callbackUrl: "/dashboard"
        })
      }, 2000)

    } catch (error) {
      setError(`Terjadi kesalahan, coba lagi: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="text-emerald-600 text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Berhasil!</h1>
          <p className="text-gray-600">
            Akun berhasil dibuat. Anda akan diarahkan ke dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar</h1>
        <p className="text-gray-600">Bergabung dengan SEA Catering</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Nama lengkap"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="contoh@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Nomor Telepon (Opsional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="08123456789"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors pr-12"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          {formData.password && (
            <div className="mt-2 space-y-1">
              <div className={`flex items-center text-sm ${passwordValidation.minLength ? 'text-emerald-600' : 'text-gray-500'}`}>
                <FaCheck className={`mr-2 ${passwordValidation.minLength ? '' : 'opacity-30'}`} />
                Minimal 6 karakter
              </div>
              <div className={`flex items-center text-sm ${passwordValidation.hasNumber ? 'text-emerald-600' : 'text-gray-500'}`}>
                <FaCheck className={`mr-2 ${passwordValidation.hasNumber ? '' : 'opacity-30'}`} />
                Mengandung angka
              </div>
              <div className={`flex items-center text-sm ${passwordValidation.hasLetter ? 'text-emerald-600' : 'text-gray-500'}`}>
                <FaCheck className={`mr-2 ${passwordValidation.hasLetter ? '' : 'opacity-30'}`} />
                Mengandung huruf
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors pr-12 ${
                formData.confirmPassword && !passwordsMatch 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-300 focus:border-emerald-500'
              }`}
              placeholder="Konfirmasi password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {formData.confirmPassword && !passwordsMatch && (
            <p className="mt-1 text-sm text-red-600">Password tidak cocok</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || !isPasswordValid || !passwordsMatch}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? "Sedang Mendaftar..." : "Daftar"}
        </Button>
      </form>

      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">atau</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <FaGoogle className="text-red-500" />
        Daftar dengan Google
      </Button>

      <p className="text-center text-gray-600 mt-6">
        Sudah punya akun?{" "}
        <Link href="/auth/signin" className="text-emerald-600 hover:text-emerald-700 font-medium">
          Masuk sekarang
        </Link>
      </p>
    </div>
  )
} 
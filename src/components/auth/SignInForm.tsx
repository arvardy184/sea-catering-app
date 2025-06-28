"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [retryCount, setRetryCount] = useState(0)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        // If this is the first attempt and it's an admin login, try once more
        if (retryCount === 0 && email === "admin@seacatering.com") {
          console.log("First attempt failed for admin, retrying...")
          setRetryCount(1)
          
          // Wait a bit before retry to allow DB connection to establish
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const retryResult = await signIn("credentials", {
            email,
            password,
            redirect: false,
          })
          
          if (retryResult?.error) {
            setError("Email atau password salah. Jika masalah berlanjut, coba refresh halaman.")
          } else {
            // Success on retry
            await getSession()
            router.push("/dashboard")
            router.refresh()
          }
        } else {
          setError("Email atau password salah. Jika masalah berlanjut, coba refresh halaman.")
        }
      } else {
        // Success on first attempt
        await getSession()
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error("Login error:", error)
      setError(`Terjadi kesalahan koneksi. Coba refresh halaman dan login kembali.`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Masuk</h1>
        <p className="text-gray-600">Selamat datang kembali di SEA Catering</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
          {retryCount > 0 && (
            <p className="text-sm mt-2 text-red-600">
              💡 Tip: Coba refresh halaman (F5) dan login kembali jika masalah berlanjut.
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="contoh@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? "Sedang Masuk..." : "Masuk"}
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
        Masuk dengan Google
      </Button>

      <p className="text-center text-gray-600 mt-6">
        Belum punya akun?{" "}
        <Link href="/auth/signup" className="text-emerald-600 hover:text-emerald-700 font-medium">
          Daftar sekarang
        </Link>
      </p>
    </div>
  )
} 
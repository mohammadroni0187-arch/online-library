
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { authClient } from "@/lib/auth-client"
import { CheckCircle2, XCircle, BookOpen } from "lucide-react"

const SignUp = () => {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Password Validation
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasMinLength = password.length >= 6

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword

  const requirements = [
    {
      label: "At least one uppercase letter (A-Z)",
      valid: hasUppercase,
    },
    {
      label: "At least one lowercase letter (a-z)",
      valid: hasLowercase,
    },
    {
      label: "At least 6 characters",
      valid: hasMinLength,
    },
  ]

  // Email Registration
  const handleEmailSignUp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      setErrorMessage("Please fulfill all password requirements.")
      return
    }

    if (!passwordsMatch) {
      setErrorMessage("Passwords do not match.")
      return
    }

    setLoading(true)
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)

    const name = String(formData.get("name") ?? "")
    const email = String(formData.get("email") ?? "")
    const image = String(formData.get("image") ?? "")

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        callbackURL: "/",
      })

      if (error) {
        setErrorMessage(error.message || "Registration failed.")
        return
      }

      if (data) {
        router.push("/")
        router.refresh()
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Google Registration
  const handleGoogleLogin = async () => {
    setLoading(true)
    setErrorMessage("")

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })

      if (error) {
        setErrorMessage(error.message || "Google registration failed.")
        setLoading(false)
      }
    } catch {
      setErrorMessage("Google registration failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">

      <Card className="w-full max-w-md border-slate-200 shadow-xl">

        <CardHeader className="space-y-3 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <BookOpen className="h-6 w-6" />
          </div>

          <CardTitle className="text-2xl font-bold">
            Create Your Account
          </CardTitle>

          <CardDescription>
            Join BookNook and explore your next favorite book.
          </CardDescription>

        </CardHeader>

        <CardContent>

          <form onSubmit={handleEmailSignUp} className="space-y-4">

            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Profile Photo URL</Label>

              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="space-y-2 rounded-lg bg-slate-50 p-3">

                <p className="text-xs font-semibold text-slate-600">
                  Password Requirements
                </p>

                {requirements.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-xs"
                  >
                    {item.valid ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-slate-400" />
                    )}

                    <span
                      className={
                        item.valid ? "text-green-600" : "text-slate-500"
                      }
                    >
                      {item.label}
                    </span>
                  </div>
                ))}

              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {confirmPassword.length > 0 && (
                <p
                  className={`text-xs ${
                    passwordsMatch ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {passwordsMatch
                    ? "Passwords match"
                    : "Passwords do not match"}
                </p>
              )}
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500">
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={
                loading ||
                !hasUppercase ||
                !hasLowercase ||
                !hasMinLength ||
                !passwordsMatch
              }
            >
              {loading ? "Creating Account..." : "Registration"}
            </Button>

          </form>

        </CardContent>

        <CardFooter className="flex-col gap-4">

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>

            <span className="relative mx-auto block w-fit bg-card px-3 text-xs text-muted-foreground">
              OR CONTINUE WITH
            </span>
          </div>

          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            variant="outline"
            className="w-full"
            type="button"
          >
            <span className="mr-2 font-bold">G</span>
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </p>

        </CardFooter>

      </Card>

    </div>
  )
}

export default SignUp

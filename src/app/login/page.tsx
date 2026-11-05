
"use client"

import React, { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

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
import { BookOpen } from "lucide-react"
import PageTitle from "@/component/PageTitle"

const LogInPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Where to go after a successful login (used by the private pages).
  const callbackURL = searchParams.get("callbackURL") || "/"

  // Email and Password Login
  const handleEmailLogIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setLoading(true)
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)

    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL,
      })

      if (error) {
        setErrorMessage(error.message || "Login failed")
        return
      }

      if (data) {
        router.push(callbackURL)
        router.refresh()
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true)
    setErrorMessage("")

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL,
      })

      if (error) {
        setErrorMessage(error.message || "Google login failed")
        setLoading(false)
      }
    } catch {
      setErrorMessage("Google login failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">

      <PageTitle title="Login" />

      <Card className="w-full max-w-md border-slate-200 shadow-xl">

        <CardHeader className="space-y-3 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <BookOpen className="h-6 w-6" />
          </div>

          <CardTitle className="text-2xl font-bold">
            Please Login
          </CardTitle>

          <CardDescription>
            Welcome back to BookNook. Explore your favorite books.
          </CardDescription>

        </CardHeader>

        <CardContent>

          <form onSubmit={handleEmailLogIn} className="space-y-4">

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
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                required
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500">
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
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
            variant="outline"
            className="w-full"
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <span className="mr-2 font-bold">G</span>
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Register
            </Link>
          </p>

        </CardFooter>

      </Card>

    </div>
  )
}

const LogInPageWithSuspense = () => (
  <Suspense fallback={null}>
    <LogInPage />
  </Suspense>
)

export default LogInPageWithSuspense

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(email: string, password: string) {
    setError(null);
    setLoading(true);
    try {
      // TODO: substituir por chamada real ao backend de autenticação
      await new Promise((r) => setTimeout(r, 700));
      if (!email || !password) {
        setError("Preencha e-mail e senha para continuar.");
        return;
      }
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />;
}

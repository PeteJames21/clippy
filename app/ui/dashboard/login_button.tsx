"use client";
import { useRouter } from "next/navigation";

export default function LoginButton() {

  const router = useRouter();
  function handleLogin() {
    router.push("/login")
  }

  return (
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
  );
};

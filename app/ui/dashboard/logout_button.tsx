"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {

  const router = useRouter();

  async function handleLogout() {
      console.log("logging out");
      const result = await fetch("/api/logout", {
        method: "POST",
        body: new FormData()
      })
      console.log("result", result);
  };

  return (
      <button onClick={handleLogout}><u>Logout</u></button>
  );
};

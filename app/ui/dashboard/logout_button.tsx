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
      if (result.ok) {
        router.refresh();
      }
      else {
        alert('An unepected error occured during logout. Please try again')
      }
  };

  return (
      <button onClick={handleLogout}><u>Logout</u></button>
  );
};

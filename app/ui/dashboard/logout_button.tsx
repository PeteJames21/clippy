"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {

  const router = useRouter();

  async function handleLogout() {
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
      <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
  );
};

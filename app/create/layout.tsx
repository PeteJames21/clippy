import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page({children}: {children: React.ReactNode}) {
  const session = cookies().get("session")?.value;
  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="container-center background-default">
      { children }
    </div>
  );
}

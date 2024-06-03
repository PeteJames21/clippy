import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UploadForm from "@/app/ui/forms/upload_form";

export default function Page() {
  const session = cookies().get("session")?.value;
  if (!session) {
    return redirect("/login");
  }

  return (
     <UploadForm />
  );
}

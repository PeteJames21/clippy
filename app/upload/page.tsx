import UploadForm from "@/app/ui/forms/upload_form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  const session = cookies().get("session")?.value;
  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="container-center background-default">
      <UploadForm />
    </div>
  );
}

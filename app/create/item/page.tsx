import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UploadForm from "@/app/ui/forms/upload_form";
import { TextItemProps } from "@/app/lib/types";
import { getCollection, getTextItem } from "@/app/lib/db";

export default async function Page({searchParams}: {searchParams: {itemID?: string}}) {
  const session = cookies().get("session")?.value;
  if (!session) {
    return redirect("/login");
  }

  // Get the item id from the URL query parameters
  const itemID = Number(searchParams?.itemID);
  let props: TextItemProps = {};
  if (itemID) {
    // Get item details from server and pass to props
    props = await getTextItem(itemID);
    props.collectionName = (await getCollection(props.collectionID)).name
  }

  return (
     <UploadForm props={props}/>
  );
}

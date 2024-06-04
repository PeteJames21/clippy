import CreateCollectionForm from "@/app/ui/forms/create_collection";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {CollectionProps} from "@/app/ui/forms/create_collection"
import { getCollection } from "@/app/lib/db";

export default async function Page({searchParams}: {searchParams: {collectionID?: string}}) {
  const session = cookies().get("session")?.value;
  if (!session) {
    return redirect("/login");
  }

  // Get the collection id from the URL query parameters
  const collectionId = Number(searchParams?.collectionID);
  let props: CollectionProps = {};
  if (collectionId) {
    // Get collection details from server and pass to props
    props = await getCollection(collectionId);
  }

  return (
    <CreateCollectionForm props={props}/>
  );
}

import Link from "next/link";
import Image from "next/image";

// Params:
// hoverText: text to be displayed when the mouse hovers over the component
// url: url to be navigated to when the user clicks the component
export default function EditIcon({hoverText, url}) {
  return (
    <Link href={url}>
      <div data-toggle="tooltip" data-placement="right" title={hoverText}>
        <Image src="/icons/icon-edit.svg" alt="pencil icon" height={20} width={20}/>
      </div>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function AddButton() {
  return (
    <div className="dropdown">
      <button className={`btn btn-primary btn-lg`} type="button" id="addMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">+</button>
      <div className={"dropdown-menu"} aria-labelledby="addMenuButton">
        <div className="clippyDropDownMenu">
          <Link href="/create/collection">
            <Image src="/icons/icon-collection.svg" alt="collection image" width={20} height={20}/>
            <span className="clippyDropDownMenuItem">New collection</span>
          </Link>
          <Link href="/create/item">
            <Image src="/icons/code.png" alt="collection image" width={20} height={20}/>
            <span className="clippyDropDownMenuItem">New item</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

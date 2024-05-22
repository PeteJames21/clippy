import Image from "next/image";
import TagListItem from "./TagListItem";
import styles from "./forms.module.css";

export default function UploadForm() {
  return (
    <form action="" id="upload-form" className={styles.upload_form}>
      <div>
        <div className={styles["radioGroup"]}>
          <div>Item visibility</div>
          <input type="radio" name="visibility" value="private" id="private" />
          <label htmlFor="private">Private</label>
          <input type="radio" name="visibility" value="public" id="public" defaultChecked />
          <label htmlFor="public">Public</label>
        </div>

        <div className={styles["radioGroup"]}>
          <div>Upload type</div>
          <input type="radio" name="item-type" value="image" id="image" />
          <label htmlFor="image">Image</label>
          <input type="radio" name="item-type" value="text" id="text" defaultChecked />
          <label htmlFor="text">Text</label>
        </div>
      </div>

    {/* Section for uploading text */}
      <div>
        <textarea className={styles.textArea} id="text-upload" name="text-upload" placeholder="Enter text here..."></textarea>
      </div>

      {/* Section for uploading a file */}
      <div className={styles.fileUploadSection}>
        <div className={styles.dropZone}>
          <Image className={styles.dropImage} src="image-placeholder.svg" width={200} height={200} alt="Form image"/>
          <div>
            Drag an image here or <span id="file-upload-link">upload a file</span>
          </div>
        </div>

        <div className={styles.divider}>
          <div className={styles["dotted-line"]}></div>
          <span className={styles.dividerText}>OR</span>
          <div className={styles["dotted-line"]}></div>
        </div>

        <input type="text" name="url-input" className={styles["text-input"]} placeholder="Paste image link" />
    </div>

    {/* Section for providing ttem Description */}
    <div>
      <p>Optional description (e.g. purpose, sources, etc.):</p>
      <textarea id="description" className={`${styles.textArea} ${styles["item-description"]}`} name="description" placeholder="Enter item description"></textarea>
    </div>

    {/* Section for adding tags */}
    <div className={styles.tagSelectionArea}>
      <div>
        <input type="text" name="tag" className={styles["text-input"]} placeholder="Add a tag"/>
        <span>?</span>
      </div>
      <div className={styles["tag-list"]}>
        <TagListItem label="Python"/>
        <TagListItem label="Machine Learning"/>

        </div>

    </div>

    {/* Section for selecting the collection */}
    <div className={styles["collection-list"]}>
      <p>Choose a Collection</p>
      <input type="text" name="collection-name" className={styles["text-input"]} placeholder="Search collection or enter collection to create" />
    </div>


    <button className={`btn btn-primary btn-lg btn-block ${styles["upload-button"]}`}>Upload</button>
    </form>
  );
}

"use client";
import Image from "next/image";
import TagListItem from "./TagListItem";
import styles from "./forms.module.css";
import { useState, useRef } from "react";
import React from "react";
import { MouseEvent } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function UploadForm() {
  const [textUploadSectionVisible, toggleTextUploadSectionVisibility] = useState(1);
  const [imageUploadSectionVisible, toggleImageUploadSectionVisibility] = useState(0);
  const [tags, setTags] = useState([]);

  // Object for storing form data from all fields
  const data = useRef(null);
  if (data.current === null) {
    data.current = {
      visibility: "public",
      itemType: "text",
      imgURL: "",
      description: "",
      collectionName: "",
      tags: [],
      textItemContent: ""
    }
}

  function handleVisibilityChange(event: React.ChangeEvent) {
    // Called when item visibility changes between public and private
    data.current.visibility = event.target.getAttribute('value');
  }

  /**
   * Toggle the visibility of the image/text upload sections
   */
  function handleTypeChange(event: React.ChangeEvent) {
    const itemType = event.target.getAttribute('value');
    data.current.itemType = itemType;
    if (itemType === 'text') {
      toggleImageUploadSectionVisibility(0);
      toggleTextUploadSectionVisibility(1);
    }
    else {
      toggleImageUploadSectionVisibility(1);
      toggleTextUploadSectionVisibility(0);
    }
  }

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    const target = event.target.getAttribute('name');
    data.current = {...data.current, [target]: value};
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();  // Prevent the form from being submitted
      if (tags.length === 5) {
        // Cannot have > 5 tags
        alert('cant have more than 5 tags');
        return;
      }
      const value = event.currentTarget.value;
      event.currentTarget.value = "";
      setTags([...tags, {'value': value, key: uuidv4()}]);
    }
  }

  function handleClick(event: MouseEvent) {
    const itemId  = (event.target as HTMLElement).getAttribute('id');
    const newList = tags.filter(item => item.key !== itemId);
    setTags(newList);
  }

  return (
    <form action="" id="upload-form" className={styles.upload_form}>
      <div>
        <div className={styles["radioGroup"]}>
          <div>Item visibility</div>
          <input type="radio" name="visibility" value="private" id="private" onChange={handleVisibilityChange}/>
          <label htmlFor="private">Private</label>
          <input type="radio" name="visibility" value="public" id="public" defaultChecked onChange={handleVisibilityChange}/>
          <label htmlFor="public">Public</label>
        </div>

        <div className={styles["radioGroup"]}>
          <div>Upload type</div>
          <input type="radio" name="itemType" value="image" id="image" onChange={handleTypeChange}/>
          <label htmlFor="image">Image</label>
          <input type="radio" name="itemType" value="text" id="text" defaultChecked onChange={handleTypeChange} />
          <label htmlFor="text">Text</label>
        </div>
      </div>

    {/* Section for uploading text */}
      <div className={textUploadSectionVisible? "": styles.hidden}>
        <textarea className={styles.textArea}
          id="textItemContent" name="textItemContent"
          placeholder="Enter text here..."
          onChange={handleTextAreaChange}>

        </textarea>
      </div>

      {/* Section for uploading a file */}
      <div className={`${styles.fileUploadSection} ${imageUploadSectionVisible? "" : styles.hidden}`}>
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

        <input type="text" name="imgURL" className={styles["text-input"]} placeholder="Paste image link" />
      </div>

    {/* Section for providing ttem Description */}
    <div>
      <p>Optional description (e.g. purpose, sources, etc.):</p>
      <textarea className={`${styles.textArea} ${styles["item-description"]}`}
        name="description" placeholder="Enter item description"
        onChange={handleTextAreaChange}>
      </textarea>
    </div>

    {/* Section for adding tags */}
    <div className={styles.tagSelectionArea}>
      <div>
        <input type="text"
        name="tag"
        className={styles["text-input"]}
        placeholder="Add a tag"
        onKeyDown={handleKeyDown}/>
        <span>?</span>
      </div>
      <div className={styles["tag-list"]} onClick={handleClick}>
        {
          tags.map((item, index) =>
            <TagListItem label={item.value} key={item.key} itemId={item.key}/>
          )
        }

        </div>

    </div>

    {/* Section for selecting the collection */}
    <div className={styles["collection-list"]}>
      <p>Choose a Collection</p>
      <input type="text" name="collectionName" className={styles["text-input"]} placeholder="Search collection or enter collection to create" />
    </div>


    <button className={`btn btn-primary btn-lg btn-block ${styles["upload-button"]}`}>Upload</button>
    </form>
  );
}

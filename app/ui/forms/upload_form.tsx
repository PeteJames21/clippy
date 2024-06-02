"use client";
import Image from "next/image";
import TagListItem from "./TagListItem";
import styles from "./forms.module.css";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import React from "react";
import { MouseEvent } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const router = useRouter();
  const [textUploadSectionVisible, toggleTextUploadSectionVisibility] = useState(1);
  const [imageUploadSectionVisible, toggleImageUploadSectionVisibility] = useState(0);
  const [tags, setTags] = useState([]);
  const [collection, setCollection] = useState("");
  const formModified = useRef(false);

  // Object for storing form data from all fields
  const data = useRef(null);
  if (data.current === null) {
    data.current = {
      visibility: "public",
      itemType: "text",
      imgURL: "",
      description: "",
      collectionName: "",
      textItemContent: "",
      tags: []
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
    const value = event.target.value.trim();
    const target = event.target.getAttribute('name');
    data.current = {...data.current, [target]: value};
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();  // Prevent the form from being submitted
      const value = event.currentTarget.value.trim();
      if (value === "") {
        event.currentTarget.value = ""
        return;
      }
      if (tags.some(item => item.value === value)){
        // Item already exists
        event.currentTarget.value = "";
        return;
      }
      if (tags.length === 5) {
        // Cannot have > 5 tags
        alert('cant have more than 5 tags');
        return;
      }
      event.currentTarget.value = "";  // Clear the input field
      const newTag = {'value': value, key: uuidv4()}
      setTags([...tags, newTag]);  // Update state for displaying the list
      // Update ref for storing the values
      const tagValues = [...tags, newTag].map(
        item => item.value
      )
      data.current.tags = tagValues;
    }
  }

  /**
   * Delete the clicked tag
   */
  function handleClick(event: MouseEvent) {
    const itemId  = (event.target as HTMLElement).getAttribute('id');
    const newList = tags.filter(item => item.key !== itemId);
    setTags(newList);
  }

  function handleCollectionNameChange(event: ChangeEvent<HTMLInputElement>) {
    setCollection(event.target.value);
    data.current.collectionName = event.target.value;
  }

  async function handleOnSubmit(event: SubmitEvent) {
    event.preventDefault();
    formModified.current = false
    // TODO: add validation functions here
    const uploadData = {
      ...data.current,
    }
    const resp = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(uploadData)
    })

    if (resp.ok) {
      router.push("/dashboard");
    }
    else {
      const res = await resp.json();
      alert(`An unexpected error occured: ${res.message}`)
    }
  }

  useEffect(
    () => {
      // Warn the user of potential data loss when attempting to refresh the form
      // or navigate away from it while it still has unsaved changes.
      const formFields = document.querySelectorAll('input, textarea, select');
      formFields.forEach(field => {
        field.addEventListener("change", () => {
            formModified.current = true;
        });
      });

      window.addEventListener("beforeunload", function (e) {
        if (formModified) {
          e.preventDefault();
        }
      });
    }, []
  )

  // Prevent default form behavior on submit
  useEffect(
    () => {
      document.querySelector('form').addEventListener('submit', handleOnSubmit)
    }, []
  )

  // Prevent form from being submitted when enter key is pressed
  useEffect(
    () => {
      document.getElementById('input-collection-name').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
        }
    });
    }, []
  );
  return (
    <form action="" id="upload-form" className={styles.upload_form}>
      <p className="h3 text-center">Upload a New Item</p>
      <div>
        <div className="h5">Item visibility</div>
        <div className={styles["radioGroup"]}>
          <input type="radio" name="visibility" value="private" id="private" onChange={handleVisibilityChange}/>
          <label htmlFor="private">Private</label>
          <input type="radio" name="visibility" value="public" id="public" defaultChecked onChange={handleVisibilityChange}/>
          <label htmlFor="public">Public</label>
        </div>
      </div>

      {/* Hidden until the image upload feature is implemented */}
      <div className={styles.hidden}>
        <div className="h5">Upload type</div>
          <div className={styles["radioGroup"]}>
            <input type="radio" name="itemType" value="image" id="image" onChange={handleTypeChange}/>
            <label htmlFor="image">Image</label>
            <input type="radio" name="itemType" value="text" id="text" defaultChecked onChange={handleTypeChange} />
            <label htmlFor="text">Text</label>
          </div>
      </div>

    {/* Section for uploading text */}
      <div className={textUploadSectionVisible? "": styles.hidden}>
        <p className="h5">Item Content</p>
        <textarea className={styles.textArea}
          id="textItemContent" name="textItemContent"
          required
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

    {/* Section for providing item Description */}
    <div>
      <p className="h5">Item description (e.g. purpose, sources, etc.)</p>
      <textarea className={`${styles.textArea} ${styles["item-description"]}`}
        name="description" placeholder="Enter item description"
        onChange={handleTextAreaChange}>
      </textarea>
    </div>

    {/* Section for adding tags */}
    <div className={styles.tagSelectionArea}>
      <p className="h5">Create Tags for Your Item</p>
      <div>
        <input type="text"
        name="tag"
        className={styles["text-input"]}
        placeholder="Add a tag"
        onKeyDown={handleKeyDown}/>
        <span className={styles.infoToolTip} id="tagInfoTooltip">?</span>
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
      <p className="h5">Choose a Collection</p>
      <input
        id="input-collection-name"
        type="text"
        name="collectionName"
        required
        className={styles["text-input"]}
        placeholder="Search collection or enter collection to create"
        onChange={handleCollectionNameChange}/>
    </div>


    <input
      type="submit"
      className={`btn btn-primary btn-lg btn-block ${styles["upload-button"]}`}
      value={"Upload"}
    />
    </form>
  );
}

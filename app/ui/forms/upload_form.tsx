"use client";
import TagListItem from "./TagListItem";
import styles from "./forms.module.css";
import { useState, useEffect, ChangeEvent } from "react";
import React from "react";
import { MouseEvent } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";
import { TextItemProps } from "@/app/lib/types";

export default function UploadForm({props} : {props: TextItemProps}) {
  const router = useRouter();
  const [tags, setTags] = useState([]);

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value.trim();
    const target = event.target.getAttribute('name');
    props[target] = value;
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
      props.tags = tagValues.join(",");
    }
  }

  /**
   * Delete the clicked tag
   */
  function handleClick(event: MouseEvent) {
    const itemId  = (event.target as HTMLElement).getAttribute('id');
    const newList = tags.filter(item => item.key !== itemId);
    setTags(newList);
    props.tags = newList.join(",");
  }

  function handleCollectionNameChange(event: ChangeEvent<HTMLInputElement>) {
    props.collectionName = event.target.value.trim();
  }

  async function handleOnSubmit(event: SubmitEvent) {
    // concatenate tags into a string
    event.preventDefault();
    // TODO: add validation functions here
    const resp = await fetch("/api/new/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(props)
    })
    const res = await resp.json();
    if (resp.ok) {
      // TODO: put the ID as a query param in dashboard so that the user
      // can view the item after creating it
      // const itemID = res.itemID;
      router.push("/dashboard");
    }
    else {
      alert(`An unexpected error occured: ${res.message}`)
    }
  }

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

  // Initialize tags from props
  useEffect(
    () => {
      if (props.tags) {
        const values = props.tags.split(",");
        const objs = values.map(
          (value) => ({value, key: uuidv4()})
        );
        setTags(objs);
      }
    }, []
  );

  return (
    <form action="" id="upload-form" className={styles.upload_form}>
      <p className="h3 text-center">Upload a New Item</p>

    {/* Section for selecting the collection */}
    <div className={styles["collection-list"]}>
      <p className="h5">Choose a Collection</p>
      <input
        id="input-collection-name"
        type="text"
        name="collection"
        defaultValue={props.collectionName}
        required
        className={styles["text-input"]}
        placeholder="Enter collection name"
        onChange={handleCollectionNameChange}/>
    </div>

    {/* Section for uploading text */}
      <div>
        <p className="h5">Item Content</p>
        <textarea className={styles.textArea}
          id="textItemContent" name="content"
          required
          defaultValue={props.content}
          placeholder="Enter text here..."
          onChange={handleTextAreaChange}>

        </textarea>
      </div>


    {/* Section for providing item Description */}
    <div>
      <p className="h5">Item description (e.g. purpose, sources, etc.)</p>
      <textarea className={`${styles.textArea} ${styles["item-description"]}`}
        name="description" placeholder="Enter item description"
        defaultValue={props.description}
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
        placeholder="Add a tag and press Enter to save"
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

    <input
      type="submit"
      className={`btn btn-primary btn-lg btn-block ${styles["upload-button"]}`}
      value={"Upload"}
    />
    </form>
  );
}

"use client";
import styles from "@/app/ui/forms/forms.module.css";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect } from "react";

export type CollectionProps = {
  id?: number,
  public?: boolean,
  name?: string,
  description?: string
  imgPath?: string
  userId?: number
}

export default function CreateCollectionForm({props} : {props: CollectionProps}) {
  const router = useRouter();

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value.trim();
    props.description = value;
  }

  function handleInputElementChange(event: ChangeEvent<HTMLInputElement>) {
    props.name = event.target.value;
  }

  function handleVisibilityChange(event: React.ChangeEvent) {
    props.public = (event.target.getAttribute("value") === "public");
  }

  async function handleOnSubmit(event: SubmitEvent) {
    event.preventDefault();
    const resp = await fetch("/api/new/collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(props)
    })

    if (resp.ok) {
      // alert("ok");
      router.push("/dashboard");
    }
    else {
      const res = await resp.json();
      alert(`An unexpected error occured: ${res.message}`)
    }
  }

  useEffect(
    () => {
      document.querySelector('form').addEventListener('submit', handleOnSubmit);
      const publicRadio = document.getElementById('public') as HTMLInputElement
      const privateRradio = document.getElementById('private') as HTMLInputElement
      // If visibility is not set, set value to public
      if (typeof props.public === "undefined") {
        publicRadio.checked = true;
        props.public = true;
      }
      // Otherwise set it to its value
      else {
        publicRadio.checked = props.public;
        privateRradio.checked = !props.public;
      }
    }, []
  )

  // Prevent form submission when Enter key is pressed in text input element
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
    <form className={styles.upload_form}>
      <p className="h3 text-center">
        {props.id? "Update Collection Details": "Create a New Collection"}
      </p>

      {/* Section for selecting collection visibility */}
      <div>
        <p className="h5">Collection Visibility</p>
        <div className={styles["radioGroup"]}>
          <input type="radio" name="visibility" value="private" id="private" onChange={handleVisibilityChange}/>
          <label htmlFor="private">Private</label>
          <input type="radio" name="visibility" value="public" id="public" onChange={handleVisibilityChange}/>
          <label htmlFor="public">Public</label>
        </div>
      </div>

      {/* Section for entering collection name */}
      <div>
        <p className="h5">Provide a Name for Your New Collection</p>
        <input type="text"
          name="name"
          id="input-collection-name"
          defaultValue={props.name}
          required
          onChange={handleInputElementChange}
          className={styles["text-input"]}
          placeholder="Enter name..."
        />
      </div>

      {/* Section for entering collection description */}
      <div>
        <p className="h5">Collection Description</p>
        <textarea
          className={`${styles.textArea} ${styles["item-description"]}`}
          onChange={handleTextAreaChange}
          defaultValue={props.description}
          id="textItemContent" name="description"
          placeholder="Enter text here...">
        </textarea>
      </div>

      <input
        type="submit"
        className={`btn btn-primary btn-lg btn-block ${styles["upload-button"]}`}
        value={props.id? "Update": "Create"}
      />
    </form>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

function PostProfile() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ypjwhxqk");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/djxtwdhpi/image/upload",
        formData
      );

      console.log("Image uploaded successfully!");
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error("Error while uploading image:", error);
    }
  };

  const handleSavePost = async (e) => {
    e.preventDefault();

    const postData = {
      media_url: imageUrl,
      caption: caption,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/Post",
        postData,
        {
         
          withCredentials: true,
        }
      );

      console.log("Post saved successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error while saving post:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleImageUpload}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Upload Image</button>
      </form>

      {imageUrl && (
        <div>
          <Image cloudName="djxtwdhpi" publicId={imageUrl} />
          <form onSubmit={handleSavePost}>
            <label>Caption:</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <button type="submit">Save Post</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostProfile;

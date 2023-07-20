import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import { useCookies } from "react-cookie";

function PostProfile() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [cookies] = useCookies(["sessionID"]);

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

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      console.error("Please upload an image");
      return;
    }

    const profileData = {
      bio: bio,
      username: username,
      Profile_pic_url: imageUrl,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/Postprofile",
        profileData,
        {
          withCredentials: true,
        }
      );

      console.log("Profile saved successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error while saving profile:", error);
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
          <form onSubmit={handleSaveProfile}>
            <label>Bio:</label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <button type="submit">Save Profile</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostProfile;

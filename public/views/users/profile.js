document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // Get elements
  const profilePicture = document.getElementById("profilePicture");
  const profilePictureInput = document.getElementById("profilePictureInput");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("address");
  const cityInput = document.getElementById("city");
  const postalCodeInput = document.getElementById("postalCode");
  const countryInput = document.getElementById("country");
  const updateButton = document.getElementById("updateButton");

  // Fetch and populate profile data
  async function fetchProfile() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userProfile = response.data.profile;
    //   console.log(userProfile);
    //   console.log(userProfile.address);


      // Set initial values
      profilePicture.src = userProfile.profilePicture || "default-profile.png";
      nameInput.value = userProfile.name;
      emailInput.value = userProfile.email;
      addressInput.value = userProfile.address;
      cityInput.value = userProfile.city;
      postalCodeInput.value = userProfile.postalCode;
      countryInput.value = userProfile.country;
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  // Handle profile picture change
  profilePictureInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        profilePicture.src = reader.result; // Preview the new image
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle profile update
  updateButton.addEventListener("click", async () => {
    const updatedProfile = {
      name: nameInput.value,
      address: addressInput.value,
      city: cityInput.value,
      postalCode: postalCodeInput.value,
      country: countryInput.value,
    };

    try {
      // Upload profile picture if changed
      if (profilePictureInput.files[0]) {
        const file = profilePictureInput.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("fileName", file.name); // Add the file name to the form data

          try {
            // Get the pre-signed URL from the backend
            const urlResponse = await axios.post(
              "http://localhost:5000/api/v1/user/profile-picture-url",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            // Proceed to upload the file to S3 using the pre-signed URL
            const uploadResponse = await axios.put(urlResponse.data.url, file, {
              headers: {
                "Content-Type": file.type, // Set the correct content type
              },
            });
          } catch (error) {
            console.error(
              "Error getting pre-signed URL or uploading file:",
              error
            );
          }
        }
      }

      // Update profile information
      await axios.put(
        "http://localhost:5000/api/v1/user/profile",
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  });

  // Initial fetch
  fetchProfile();
});




async function loadUserProfile() {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:5000/api/v1/user/profile', {headers: {
            Authorization: `Bearer ${token}`
        }}); 
        const userProfile = response.data;

        // Set the profile picture and profile link
        const profilePicture = document.getElementById('profilePicture');
        profilePicture.src = userProfile.profilePicture || 'default-profile.png'; // Default picture if not provided

        const profileLink = document.getElementById('profileLink');
        profileLink.href = `profile.html?id=${userProfile.userId}`; // Pass user ID for profile page if needed
    } catch (error) {
        console.error('Error loading user profile:', error);
    }
}

// Call the function to load the profile data when the page loads
window.onload = loadUserProfile;

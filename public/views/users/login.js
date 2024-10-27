async function login(event){

    event.preventDefault();
    try{
        const UserDetails = {
            email : event.target.email.value,
            password : event.target.password.value,
        }

        let response = await axios.post("http://localhost:5000/api/v1/user/login", UserDetails);
        localStorage.setItem("token", response.data.token);
        
        // alert("Logged In");
        window.location.href = "./dashBoard.html";
    }
    catch(err){
        // console.log(err);
        if (err.response) {
            if (err.response.status === 404) {
                // User already exists
                alert("No User Found. Please SignupInstead instead.");
                window.location.href = "./signup.html";  // Redirect to the signup page
            } 
            else if(err.response.status === 400){
                alert("Kindly verify your creds and try againg");
            }
            else {
                // General error message from server
                alert(`Error: ${err.response.data.message || "An error occurred during login"}`);
            }
        } else {
            // Network or other error
            alert("Network error or server not reachable");
        } 

    }

}
//use to connect html to php
document
  .getElementById("Registration")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    //use to fetch the php file
    fetch("backend/registration.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        if (data.status == "success") {
          //use to clear the form within the html
          document.getElementById("Registration").reset();
        }
      })
      .catch((error) => {
        alert("An Error occurred. Please Try again");
        console.error("Error", error);
      });
  });

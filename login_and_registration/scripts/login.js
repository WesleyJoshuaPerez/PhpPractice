//use to connect html to php
document.getElementById("Login").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  //use to fetch the php file
  fetch("backend/login.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      if (data.status == "success") {
        //use to go to the dashboard
        window.location.href = "dashboard.html";
      }
    })
    .catch((error) => {
      alert("An Error occurred. Please Try again");
      console.error("Error", error);
    });
});

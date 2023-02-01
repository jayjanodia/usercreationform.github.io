const form = document.querySelector("form");

var selectOccupation = document.getElementById("occupation");
var selectState = document.getElementById("state");
var isVisiblePassword = false;
var isVisibleConfirm = false;

function seePassword() {
  var togglePassword = document.getElementById("togglePassword");
  var password = document.getElementById("password");

  if (isVisiblePassword) {
    password.type = "password";
    isVisiblePassword = false;
    togglePassword.classList.toggle("bi-eye");
  } else {
    password.type = "text";
    isVisiblePassword = true;
    togglePassword.classList.toggle("bi-eye");
  }
}

function seeConfirm() {
  var togglePassword = document.getElementById("toggleConfirm");
  var password = document.getElementById("confirm");

  if (isVisibleConfirm) {
    password.type = "password";
    isVisibleConfirm = false;
    togglePassword.classList.toggle("bi-eye");
  } else {
    password.type = "text";
    isVisibleConfirm = true;
    togglePassword.classList.toggle("bi-eye");
  }
}

url = "https://frontend-take-home.fetchrewards.com/form";
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let occupations = data.occupations;
    let states = data.states;
    // console.log(occupations[0]);
    for (let i = 0; i < occupations.length; i++) {
      let occupation = occupations[i];
      let option = document.createElement("option");
      option.textContent = occupation;
      option.value = occupation;
      // console.log(option.textContent);
      selectOccupation.appendChild(option);
    }
    for (let i = 0; i < states.length; i++) {
      let state = states[i];
      let option = document.createElement("option");
      option.textContent = state["name"];
      option.value = state["name"];
      selectState.appendChild(option);
    }
  });

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const fullName = form.fullName.value;
  const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.confirm.value;
  const occupation = form.occupation.value;
  const state = form.state.value;
  var regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!regularExpression.test(password)) {
    alert(
      "The password be 6-16 characters long and must contain at least 1 number and 1 special character"
    );
    return;
  }
  if (!occupation) {
    alert("Please enter your Occupation!");
    return;
  } else if (!state) {
    alert("Please enter your State!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords should match!");
    return;
  }

  if (password)
    if (
      !fullName ||
      !email ||
      !password ||
      !occupation ||
      !state ||
      !confirmPassword
    ) {
      alert("All fields are required!");
      return;
    }
  var formData = {
    name: fullName,
    email: email,
    password: password,
    occupation: occupation,
    state: state,
  };

  fetch("https://frontend-take-home.fetchrewards.com/form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  /* .then((response) => {
      if (response.status === 201) {
        console.log("User created successfully");
      } else {
        console.error("Failed to create user");
      }
    }); */

  alert("User created successfully!");
});

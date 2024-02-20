function init() {
  const form = document.querySelector("form");

  function debounce(func, delay) {
    let timeoutId;

    return function () {
      const args = arguments;
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  function toggleTheme() {
    let elements = document.getElementsByClassName("form");
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].className.indexOf("dark") >= 0) {
        elements[i].classList.remove("dark");
        elements[i].classList.add("light");
      } else if (elements[i].className.indexOf("light") >= 0) {
        elements[i].classList.remove("light");
        elements[i].classList.add("dark");
      }
    }
  }

  const darkLightCheckbox = document.getElementById("themeToggleButton");

  darkLightCheckbox.addEventListener("click", function (e) {
    const debouncedToggleTheme = debounce(toggleTheme, 500);
    debouncedToggleTheme();
  });

  function validateForm(formData) {
    return new Promise((resolve, reject) => {
      const body = {
        name: formData.name.value,
        email: formData.email.value,
        password: formData.password.value,
        remember: formData.remember.checked,
      };
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (body.name === "") {
        reject("Please enter name");
      } else if (body.email === "") {
        reject("Please enter email");
      } else if (!body.email.match(emailRegex)) {
        reject("Please enter valid email");
      } else if (body.password === "") {
        reject("Please enter password");
      } else if (body.password.length < 8) {
        reject("Please enter password of atleast 8 characters");
      } else {
        resolve(body);
      }
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errorEle = document.querySelector(".error");

    // const formData = new FormData(form);
    validateForm(form)
      .then((validationResults) => {
        // call api to send data
        console.log(validationResults);
        errorEle.innerText = "";
        alert("form submitted");
      })
      .catch((error) => {
        // handle the error
        errorEle.innerText = error;
      });
  });
}

window.onload = function () {
  init();
};

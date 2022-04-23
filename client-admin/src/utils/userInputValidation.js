export const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || email === "") {
    return { type: "required", message: "Email is required" };
  }
  if (!regex.test(email)) {
    return { type: "email", message: "Invalid email." };
  }
};

export const validatePassword = (password) => {
  if (!password || password === "") {
    return { type: "required", message: "password is required" };
  }
  if (password.length < 6) {
    return {
      type: "password",
      massage: "Password must at least 6 characters long",
    };
  }
};

export const validateFirstname = (firstname) => {
  if (!firstname || firstname === "") {
    return { type: "required", message: "Firstname is required" };
  }
  if (firstname.length < 3) {
    return { type: "firstname", message: "Firstname too short" };
  }
};
export const validateLastname = (lastname) => {
  if (!lastname || lastname === "") {
    return { type: "required", message: "Lastname is required" };
  }
  if (lastname.length < 3) {
    return { type: "lastname", message: "Lastname too short" };
  }
};

export const validatePasswordConfirm = (passwordConfirm, password) => {
  if (!passwordConfirm || passwordConfirm === "") {
    return { type: "required", message: "password confirmation is required" };
  }
  if (password !== passwordConfirm) {
    return {
      type: "match",
      message: "password and confirm password do not match",
    };
  }
};

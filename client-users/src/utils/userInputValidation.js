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
    return { type: "required", message: "Email is required" };
  }
};

const addVehicleValidation = (input = {}, step) => {
  switch (step) {
    case 1:
      let regExYear = /^\d+$/;
      let regExKM = /^[0-9.,]+$/;

      if (!input.year || input.year === "" || !regExYear.test(input.year)) {
        return "Year is required";
      }
      if (!input.brand || input.brand === "") {
        return "Brand is required";
      }
      if (!input.model || input.model === "") {
        return "Model is required";
      }
      if (!input.energy || input.energy === "") {
        return "Energy is required";
      }
      if (!input.transmission || input.transmission === "") {
        return "Transmission is required";
      }
      if (
        !input.kilometrage ||
        input.kilometrage === "" ||
        !regExKM.test(input.kilometrage)
      ) {
        return "Kilometrage is required";
      }
      return;
    case 2:
      if (!input.color || input.color === "") {
        return "Color is required";
      }
      if (!input.paper || input.paper === "") {
        return "Paper is required";
      }
      if (!input.accident || input.accident === "") {
        return "Accident is required";
      }
      if (
        input.accident !== "" &&
        input.accident !== "No accident" &&
        input.accidentDescription === ""
      ) {
        return "Please discribe the accident";
      }
      if (
        !input.description ||
        input.description === "" ||
        input.description.length < 12
      ) {
        return "Description must be at least 12 characters long";
      }
      return;
    case 3:
      let regExPrice = /^[0-9.,]+$/;
      if (!input.price || input.price === "" || !regExPrice.test(input.price)) {
        return "Price is required";
      }
      if (!input.offerType || input.offerType === "") {
        return "Type of the offer is required";
      }
      return;
    case 4:
      let regExPhone = /^\d+$/;
      // eslint-disable-next-line no-useless-escape
      let regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (
        (input.phone || input.phone !== "") &&
        !regExPhone.test(input.phone)
      ) {
        return "Phone number is not valid";
      }
      if (
        (input.email || input.email !== "") &&
        !regExEmail.test(input.email)
      ) {
        return "email is not valid";
      }
      return;
    case 5:
      if (!input.photos || input.photos.length <= 0) {
        return "Photos are required";
      }
      return;
    default:
      return;
  }
};
export default addVehicleValidation;

const getFacebookUrl = () => {
  const rootUri = "https://www.facebook.com/v6.0/dialog/oauth";

  const options = {
    redirect_uri: "http://localhost:5000/api/v1/users/admin/facebook/login",

    client_id: "424581699180984",
    scope: "email",
  };
  const qs = new URLSearchParams(options);

  return `${rootUri}?${qs.toString()}`;
};

export default getFacebookUrl;

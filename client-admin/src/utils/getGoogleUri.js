const getGoogleUri = () => {
  const rootUri = "https://accounts.google.com/o/oauth2/auth";
  const options = {
    redirect_uri: "http://localhost:5000/api/v1/users/admin/google/login",
    client_id:
      "922494472928-e6f2koaqqprvbkga0j543n46hasoph0p.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUri}?${qs.toString()}`;
};

export default getGoogleUri;

import  { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

const AuthCallback = () => {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    const fetchAccessToken = async () => {
      try {
        const response = await axios.post(
          "https://cors-anywhere.herokuapp.com/https://www.linkedin.com/oauth/v2/accessToken",
          qs.stringify({
            grant_type: "authorization_code",
            code,
            redirect_uri: "https://localhost:5173/auth/linkedin/callback",
            client_id: "77j01h5xe1ouuu",
            client_secret: "WPL_AP1.6JJgB6QIUYdEHvXN.6ufKFw==",
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        console.log("Access Token Response:", response.data);
        if (response.data) {
          if (response.data.access_token) {
            setToken(response.data.access_token);
          }
          // console.log("access_token",":::::mlkasdjklfjlkas::::::::::",response.data.access_token)
        }

        if (response.data.access_token) {
          setRedirect(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (code) {
      fetchAccessToken();
    }
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedToken = localStorage.getItem("access_token");
      const tokenToUse = token || storedToken;

      if (tokenToUse) {
        try {
          const response = await axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.linkedin.com/v2/userinfo", // Correct endpoint for user info
            {
              headers: {
                Authorization: `Bearer ${tokenToUse}`,
              },
            }
          );
          console.log(response.data);
        } catch (error:any) {
          console.error("Error fetching user info:", error);
          setError(error)
        }
      }
    };

    fetchUserInfo();
  }, [token]);

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return <div>Loading...{error && <div>{error}</div>}</div>;
};

export default AuthCallback;

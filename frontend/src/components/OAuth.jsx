import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/userinfo", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));

        if (data.userType === "STUDENT") {
          navigate("/studentHome");
        } else if (data.userType === "MENTOR") {
          navigate("/mentorHome");
        } else {
          navigate("/register");
        }
      })
      .catch((err) => {
        console.error("OAuth fetch failed", err);
        navigate("/register");
      });
  }, []);

  return <p className="text-center mt-10 text-lg">Logging you in...</p>;
}

export default OAuthSuccess;

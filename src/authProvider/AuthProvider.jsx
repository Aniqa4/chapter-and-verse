import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session silently on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }
    axiosInstance
      .post("/refresh-token")
      .then((res) => {
        localStorage.setItem("accessToken", res.data.token);
        setUser({ ...res.data.user, displayName: res.data.user.name });
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
      })
      .finally(() => setLoading(false));
  }, []);

  // POST /register — returns 201, verification email sent (no auto-login)
  const signUp = (name, email, password) => {
    return axiosInstance.post("/register", { name, email, password });
  };

  // POST /login — returns { token, user }
  const signIn = (email, password) => {
    return axiosInstance.post("/login", { email, password }).then((res) => {
      localStorage.setItem("accessToken", res.data.token);
      setUser({ ...res.data.user, displayName: res.data.user.name });
      return res.data;
    });
  };

  // POST /auth/google — sends Google ID token credential from @react-oauth/google
  const googleSignIn = (credential) => {
    return axiosInstance.post('/auth/google', { credential }).then((res) => {
      localStorage.setItem('accessToken', res.data.token);
      setUser({ ...res.data.user, displayName: res.data.user.name });
      return res.data;
    });
  };

  // Called by /auth/callback page after server redirects back with ?token=
  const loginWithToken = (token) => {
    localStorage.setItem("accessToken", token);
    return axiosInstance.get("/me").then((res) => {
      setUser({ ...res.data, displayName: res.data.name });
      return res.data;
    });
  };

  // PATCH /update-profile — { name, phoneNumber, address }
  const updateProfile = (data) => {
    return axiosInstance.patch("/update-profile", data).then((res) => {
      setUser((prev) => ({ ...prev, ...res.data.data, displayName: res.data.data.name }));
      return res.data;
    });
  };

  // POST /logout — invalidates token on server, then clears local state
  const logOut = () => {
    return axiosInstance.post("/logout").finally(() => {
      localStorage.removeItem("accessToken");
      setUser(null);
    });
  };

  const authInfo = {
    user,
    signUp,
    signIn,
    googleSignIn,
    loginWithToken,
    updateProfile,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

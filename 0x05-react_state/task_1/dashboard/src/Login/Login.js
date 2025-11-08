import "./Login.css";
import { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";

const defineStyles = StyleSheet.create({
  disabledBtn: {
    backgroundColor: "gray",
  },
});

const Login = () => {
  // state
  const [credentials, setCredentials] = useState({
    email: "",
    pswd: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);

  // submit validation
  useEffect(() => {
    if (credentials.email.length > 0 && credentials.pswd.length > 0) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [credentials]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleChangeEmail = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleChangePassword = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <>
      <div className="App-body">
        <p>Login to access the full dashboard</p>

        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="email">email</label>
          <input
            id="email"
            autoComplete="email"
            value={credentials.email}
            onChange={handleChangeEmail}
          />
          <label htmlFor="pswd">password</label>
          <input
            id="pswd"
            type="password"
            autoComplete="current-password"
            value={credentials.pswd}
            onChange={handleChangePassword}
          />

          <input
            className={
              !enableSubmit
                ? css(defineStyles.disabledBtn)
                : undefined
            }
            disabled={!enableSubmit}
            type="submit"
            value={"OK"}
          />
        </form>
      </div>
    </>
  );
};
export default Login;

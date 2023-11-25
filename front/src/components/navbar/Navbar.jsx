import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
  const { user, loading, error, dispatchAuth } = React.useContext(AuthContext);

  const onClickLogout = () => {
    dispatchAuth({ type: "login_out" });
    localStorage.removeItem("user");
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <div>Hotel Booking</div>
          </Link>
          <div className={styles.buttons_wrapper}>
            {user ? (
              <div className={styles.buttons}>
                <div className={styles.account}>
                  Hello, {user.user.username}
                </div>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <div className={styles.buttons}>
                  <Link to="/login">
                    <Button
                      sx={{
                        margin: "0",
                        ":hover": {
                          backgroundColor: "#01579b",
                          outline: "1px solid white",
                          color: "white",
                        },
                      }}
                      variant="signin"
                      className={styles.header_btn}
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      sx={{
                        margin: "0",
                        ":hover": {
                          backgroundColor: "#01579b",
                          outline: "1px solid white",
                          color: "white",
                        },
                      }}
                      variant="signin"
                      className={styles.header_btn}
                    >
                      Create Account
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

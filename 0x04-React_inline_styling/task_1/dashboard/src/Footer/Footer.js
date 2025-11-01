/* import "./Footer.css"; */
import React from "react";
import { StyleSheet, css } from "aphrodite";
import { getFullYear, getFooterCopy } from "../utils/utils";

const defineStyles = StyleSheet.create({
  appFooter: {
    backgroundColor: "#e0e0e0",
    width: "100%",
    height: "fit-content",
    padding: "clamp(10px, 2vh, 20px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "1px solid red",

    "@media (max-width: 601px)": {
      overflowWrap: "break-word",
      fontSize: "clamp(10px, 2vw, 20px)",
    },
  },
});

const classN = `App-footer ${css(defineStyles.appFooter)}`;

const Footer = () => (
  <>
    <div className={classN}>
      <p>
        Copyright {getFullYear()} - {getFooterCopy(true)}
      </p>
    </div>
  </>
);
export default Footer;


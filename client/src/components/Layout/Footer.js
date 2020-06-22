import React from "react";
import "./styles/footer.css";

export default function Footer() {
  return (
    <div>
      <footer
        align="center"
        className="credit"
        data-hover={"Made with \u2764\uFE0F by Advaitva"}
      >
        <span>&copy; {new Date().getFullYear()} Copyright : DevChat</span>
      </footer>
    </div>
  );
}

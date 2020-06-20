import React from "react";
import "./styles/footer.css";

export default function Footer() {
  return (
    <div>
      <footer className="credit" onMouseOver="Made with &#X2764 by Advaitva">
        <span> &copy; {new Date().getFullYear()} Copyright : DevChat</span>
      </footer>
    </div>
  );
}

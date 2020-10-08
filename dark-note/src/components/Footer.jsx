import React from "react";

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>Copyright dot_growenⓒ {year}</p>
        </footer>
    );
}

export default Footer;
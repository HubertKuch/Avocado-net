import React from "react";
import avocado from "../images/avocado.svg";

export default function Header({ children }) {
    return <header>
        <img src={avocado} alt="avocado-icon" id={"logo"}/>
        <span id={"project-name"}>Avocado</span>
        {children}
    </header>
}

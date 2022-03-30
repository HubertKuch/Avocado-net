import React from "react";
import avocado from "../images/avocado.svg";
import ColorText from "../components/ColorText";
import Nav from "../components/Nav";

export default function Main() {
    return (
        <>
            <header>
                <img src={avocado} alt="avocado-icon" id={"logo"}/>
                <span id={"project-name"}>Avocado</span>
            </header>
            <main>
                <p id={"project-description"}>
                    <ColorText color={'#92C58A'}>Avocado</ColorText> is hobbyist PHP framework which implements routing and
                    object-relational mapping (ORM). If you want use <ColorText color={"#5179DE"}>PHP</ColorText> only to backend
                    <ColorText color={'#92C58A'}>Avocado</ColorText> is best position to you.
                </p>
            </main>
            <Nav/>
        </>
    )
}
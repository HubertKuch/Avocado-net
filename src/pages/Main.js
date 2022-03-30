import React from "react";
import ColorText from "../components/ColorText";
import Nav from "../components/Nav";
import Header from "../components/Header";

export default function Main() {
    return (
        <>
            <Header />
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
import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Main from "./pages/Main";
import Documentation from "./pages/Documentation";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} exact element={<Main/>} />
                <Route path={"/documentation/:slug"} element={<Documentation/>} />
            </Routes>
        </BrowserRouter>
    )
}

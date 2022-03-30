import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Main from "./pages/Main";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} exact element={<Main/>} />
                <Route path={"/documentation/:slug"} element={<Main/>} />
                <Route path={"/installation"} element={<Main/>} />
                <Route path={"/about-project"} element={<Main/>} />
                <Route path={"/author"} element={<Main/>} />
                <Route path={"/suggest"} element={<Main/>} />
                <Route path={"/initializer"} element={<Main/>} />
            </Routes>
        </BrowserRouter>
    )
}

import React from "react";
import { Navbar } from "reactstrap";

export default function Home(props) {
    console.log(props);

    return (
        <div className="container">
            <Navbar />
        </div>
    );
}
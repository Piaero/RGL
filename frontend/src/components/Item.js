import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

import React, { Component } from 'react';


const Item = () => {
    const { url, path } = useRouteMatch();


    return (
        <div>
            <h2>Item</h2>
        </div>
    )
}

export default Item
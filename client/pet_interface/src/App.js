import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Choices from './ChoicePage.js';

function App() {
    return (
        <Choices/>
    );
}
export default App;

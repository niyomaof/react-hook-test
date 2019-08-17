import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import IndexController from '../IndexController'
import UserController from "../UserController";
import AboutController from "../AboutController";

const MainLayoutController = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/user/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={ IndexController }/>
        <Route path="/about/" exact component={ AboutController }/>
          <Route path="/user/" exact component={ UserController }/>
      </div>
    </Router>
  );
};

export default MainLayoutController;

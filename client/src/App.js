import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Footer from "./components/Layout/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

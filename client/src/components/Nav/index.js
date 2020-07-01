import React from "react";

function Nav(props) {
  const logout = () => {
    localStorage.clear();
    window.location.assign("/");
  };
  const isAuthenticated = JSON.parse(localStorage.getItem("tokens"));
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        {props.title}
      </a>
      {isAuthenticated ? <button onClick={() => logout()}>logout</button> : ""}
    </nav>
  );
}

export default Nav;

import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-white text-dark p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container">
      <div className=" text-dark text-center">
        <h2 className="display-6">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-light mt-auto py-3">
      <div className="container-fluid bg-light text-dark text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-dark">Place</span> To Shop
        </span>
      </div>
    </footer>
  </div>
);

export default Base;

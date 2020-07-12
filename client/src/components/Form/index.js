import React from "react";
import "./style.css";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
      <input className="form-control" id={props.name} {...props} />
    
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props}>
      {props.children}
    </button>
  );
}

export function Dropdown(props) {
  return (
      <select className="custom-select" id={props.name} {...props}>
      </select>
  )
}

export function Option(props) {
  return (<option id={props.name} value={props.name}>{props.name}</option>
  )
}
import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
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
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}

export function Dropdown(props) {
  return (
      <select className="custom-select" id="inputGroupSelect01" {...props}>
        <option >Workout Type</option>
        <option value="For Time">For Time</option>
        <option value="AMRAP">AMRAP</option>
        <option value="Tabata">Tabata</option>
      </select>

  )
}

export function Option(props) {
  return (<option value={props.name}>{props.name}</option>
  )
}
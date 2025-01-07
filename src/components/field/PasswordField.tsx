import React from 'react';
import './Field.css';
import { FieldProps } from "../../types/field/FieldProps";

const PasswordField: React.FC<FieldProps> = ({ id, className, label, placeholder, value, onChange }) => (
  <div className={`fields ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input type="password" id={id} className="input" placeholder={placeholder} value={value} onChange={onChange} />
  </div>
);

export default PasswordField;
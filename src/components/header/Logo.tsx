import React from 'react';
import "./Header.css";
import { LogoProps } from '../../types/header/LogoProps';

const Logo: React.FC<LogoProps> = ({ link }) => {
    return (
      <a href={link ?? ''} className={`yes-bank-header-link`}>
       <div className="yes-bank-header-yes">Yes</div>
       <div className="yes-bank-header-bank">Bank</div>
      </a>
    );
}

export default Logo;
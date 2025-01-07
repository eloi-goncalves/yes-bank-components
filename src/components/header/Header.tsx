import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";
import { HeaderProps } from "../../types/header/HeaderProps";

const UserName: React.FC<{ userType: string }> = ({ userType }) => {
  if (userType === "S") {
    return <div className="yes-bank-header-user-name">Eduarda Silva Neves</div>;
  }
  return <div className="yes-bank-header-user-name"></div>;
};

const Header: React.FC<HeaderProps> = ({ user, type }) => {
  if (!user || !type) {
    console.error("Missing required props: user or type");
    return null;
  }

  const renderHeaderContent = () => (
    <>
      <Logo />
      <UserName userType={user} />
      <div>
        <a href="/user" className="yes-bank-header-link">
          <FontAwesomeIcon icon={faUser} />
        </a>
      </div>
    </>
  );

  switch (type) {
    case "user":
      return <header className="yes-bank-header">{renderHeaderContent()}</header>;
    default:
      return <header className="yes-bank-header">{renderHeaderContent()}</header>;
  }
};

export default Header;

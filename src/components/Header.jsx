import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import gravatar from "../utils/gravatar";
import { logoutRequest } from "../actions";
import classNames from "classnames";

import "../assets/styles/components/Header.scss";
import logo from "../assets/static/logo-platzi-video-BW2.png";
import userIcon from "../assets/static/user-icon.png";

const Header = (props) => {
  const { user, isHome, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleClick = (event) => {
    props.logoutRequest({});
  };

  const headerClass = classNames("header", {
    isLogin,
    isRegister,
  });

  return (
    <header className={headerClass}>
      <Link to="/">
        <img className="header__img" src={logo} alt="Platzi Video" />
      </Link>
      {isHome ? (
        <div className="header__menu">
          <div className="header__menu--profile">
            {hasUser ? (
              <img src={gravatar(user.email)} alt={user.name} />
            ) : (
              <img src={userIcon} alt="Gravatar User" />
            )}
            <p>Perfil</p>
          </div>
          <ul>
            {hasUser ? (
              <React.Fragment>
                <li>
                  <Link to="/">{user.name}</Link>
                </li>
                <li>
                  <button onClick={handleClick}>Cerrar Sesión</button>
                </li>
              </React.Fragment>
            ) : (
              <li>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

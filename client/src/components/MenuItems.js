import React from "react";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export const MenuItems = ({
  activeItem,
  handleItemClick,
  handleLogout,
  userId
}) => {
  return (
    <React.Fragment as={Menu}>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name="about"
        active={activeItem === "about"}
        onClick={handleItemClick}
        as={Link}
        to="/about"
      />
      {userId && (
        <Menu.Item
          name="profile"
          active={activeItem === "profile"}
          onClick={handleItemClick}
          as={Link}
          to="/profile"
        />
      )}
      {userId && (
        <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={handleLogout}
        />
      )}
      {!userId && (
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
      )}
      {!userId && (
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      )}
    </React.Fragment>
  );
};
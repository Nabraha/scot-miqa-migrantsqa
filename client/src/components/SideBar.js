import React from "react";
import { Sidebar, Menu } from "semantic-ui-react";
import { MenuItems } from "./MenuItems";

export const SideBar = ({
  visible,
  activeItem,
  handleSidebarHide,
  handleItemClick,
  userId,
  handleLogout
}) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      direction="right"
      icon="labeled"
      inverted
      vertical
      onHide={handleSidebarHide}
      visible={visible}
      width="thin"
    >
      <MenuItems
        userId={userId}
        vertical
        visible={visible}
        handleSidebarHide={handleSidebarHide}
        activeItem={activeItem}
        handleItemClick={handleItemClick}
        handleLogout={handleLogout}
      />
    </Sidebar>
  );
};
import React, { Component } from "react";
import { Menu, Responsive, Image, Container, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getUserById } from "../api/questions";
import logo from "../assets/logo.png";
import "../styles/MenuBar.css";
import { MenuItems } from "./MenuItems";
import { SideBar } from "./SideBar";

export default class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDesktop: false,
      visible: false,
      activeItem:
        window.location.pathname === "/"
          ? "home"
          : window.location.pathname.substr(1),
      profilePicUrl: null
    };
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 600 });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogout = e => {
    // Make sure we don't refresh
    e.preventDefault();
    // Clear the local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  updateProfilePic = () => {
    // Use the stored userID
    getUserById(localStorage.userId).then(response =>
      this.setState({ profilePicUrl: response.profile_pic })
    );
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      getUserById(nextProps.userId).then(response => {
        this.setState({ profilePicUrl: response.profile_pic });
      });
    }
  }

  handleSidebarHide = () => {
    this.setState({ visible: false });
  };

  handleShowClick = () => {
    this.setState({ visible: true });
  };

  componentDidMount = () => {
    this.updateProfilePic();
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  };

  render() {
    const {
      activeItem,
      visible,
      profilePicUrl,
      isDesktop,
      handleItemClick
    } = this.state;
    return (
      <>
        {isDesktop ? (
          <Menu
            inverted
            size="huge"
            className="menu"
            style={{ height: "60px" }}
          >
            <Container>
              <Image
                src={logo}
                as="a"
                size="small"
                href="/"
                style={{ width: "100px" }}
              />
              <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={this.handleItemClick}
                as={Link}
                to="/"
              />
              <Menu.Item
                name="about"
                active={activeItem === "about"}
                onClick={this.handleItemClick}
                as={Link}
                to="/about"
              />
              {this.props.userId ? (
                <Menu.Menu position="right">
                  <Menu.Item
                    name="profile"
                    active={activeItem === "profile"}
                    onClick={this.handleItemClick}
                    as={Link}
                    to="/profile"
                  />
                  <Menu.Item
                    name="logout"
                    active={activeItem === "logout"}
                    position="right"
                    onClick={this.handleLogout}
                  />
                  <Menu.Item
                    onClick={this.handleItemClick}
                    as={Link}
                    to="/profile"
                  >
                    {this.props.userId ? (
                      <Image
                        src={this.state.profilePicUrl}
                        size="mini"
                        style={{ maxWidth: "60px", width: "100%" }}
                      />
                    ) : (
                      ""
                    )}
                  </Menu.Item>
                </Menu.Menu>
              ) : (
                <Menu.Menu position="right">
                  <Menu.Item
                    name="login"
                    active={activeItem === "login"}
                    position="right"
                    onClick={this.handleItemClick}
                    as={Link}
                    to="/login"
                  />
                  <Menu.Item
                    name="register"
                    position="right"
                    active={activeItem === "register"}
                    onClick={this.handleItemClick}
                    as={Link}
                    to="/register"
                  />
                </Menu.Menu>
              )}
            </Container>
          </Menu>
        ) : (
          <Menu
            inverted
            size="huge"
            className="menu"
            fluid
            style={{ height: "60px" }}
          >
            <Container>
              <Menu.Item>
                <Image
                  src={logo}
                  as="a"
                  size="small"
                  href="/"
                  style={{ width: "75px" }}
                />
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item
                  position="right"
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/profile"
                >
                  {this.props.userId && (
                    <Image
                      src={profilePicUrl}
                      size="mini"
                      style={{ height: "45px", width: "45px" }}
                    />
                  )}
                </Menu.Item>
                <Menu.Item position="right">
                  <Responsive maxWidth={999}>
                    <Icon name="bars" onClick={this.handleShowClick} />
                  </Responsive>
                </Menu.Item>
              </Menu.Menu>
              <Responsive as={Menu} inverted minWidth={1000}>
                <MenuItems
                  activeItem={activeItem}
                  handleItemClick={this.handleItemClick}
                  handleLogout={this.handleLogout}
                  userId={this.props.userId}
                  profilePicUrl={profilePicUrl}
                />
              </Responsive>
              <SideBar
                userId={this.props.userId}
                visible={visible}
                handleSidebarHide={this.handleSidebarHide}
                activeItem={activeItem}
                handleItemClick={this.handleItemClick}
                handleLogout={this.handleLogout}
              />{" "}
            </Container>
          </Menu>
        )}
      </>
    );
  }
}

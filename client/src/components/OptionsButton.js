import React from "react";
import { Grid, Header, Dropdown, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default ({
  changePassword,
  ChangeProfilePicture,
  openPictureAddition
}) => {
  return (
    <Grid>
      <Grid.Column floated="left" width={6}>
        <Header>
          <Header.Content>
            <Dropdown item size="large" icon="options">
              <Dropdown.Menu>
                {changePassword && (
                  <Dropdown.Item as={Link} to="/change-password">
                    <Icon name="lock" color="blue" />
                    Change Password
                  </Dropdown.Item>
                )}
                {ChangeProfilePicture && (
                  <Dropdown.Item onClick={openPictureAddition}>
                    <Icon name="edit" color="green" />
                    Change Profile Picture
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Header.Content>
        </Header>
      </Grid.Column>
    </Grid>
  );
};

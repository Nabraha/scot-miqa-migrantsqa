import React from "react";
import "../styles/Footer.css";
import {
  Segment,
  Container,
  Header,
  List,
  Grid,
  Item,
  Icon,
  Image
} from "semantic-ui-react";
import cyf_logo from "../assets/cyf.png";

const Footer = () => {
  return (
    <Segment className="footer" inverted vertical>
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="MiQA team" />
            <List link inverted>
              <List.Item as="a">Nebay</List.Item>
              <List.Item as="a">Reyam</List.Item>
              <List.Item as="a">Ahmed</List.Item>
              <List.Item as="a">Zan</List.Item>
              <List.Item as="a">Saeed</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={10}>
            <p>
              Migrants' Questions and Answers is an open source project, created
              by CodeYourFuture students.
            </p>
            <p></p>
            <p>Many thanks to Gabi Lipan for the logo.</p>
            <Item
              href="https://github.com/CodeYourFuture/scot-miqa-migrantsqa"
              position="right"
              target="_blank"
            >
              <Icon link inverted name="github" size="huge" />
            </Item>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Organised by" />
            <Image
              src={cyf_logo}
              as="a"
              size="huge"
              href="https://codeyourfuture.io"
              target="_blank"
              style={{ marginTop: "5%" }}
            />
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;

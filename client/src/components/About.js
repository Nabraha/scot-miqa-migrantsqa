import React from "react";
import { Container, Header } from "semantic-ui-react";
import "../styles/About.css";

const About = () => {
  return (
    <Container text style={{ marginTop: "7em", marginBottom: "7em" }}>
      <Header className="about-header" as="h2" style={{ marginBottom: "1em" }}>
        Migrants' Q & A
      </Header>
      <p>
        Arriving in a new country may be an unsettling time for you and your
        family and life in a new land may be confusing. “How do I enrol my
        children in school?” “Where can I find shelter” – these are some
        examples of questions that people may ask themselves as they start to
        rebuild their life in the host country. This forum is designed by
        migrants for migrants - to help the newcomers to Glasgow with any
        questions they might have. The people answering the questions are
        migrants themselves or people who have an understanding of the issues
        people face when they resettle in Glasgow.{" "}
      </p>
      <p>
        To post your question or answer and to make the most of this fantastic
        webpage, please sign up using the register button on the top-right
        corner. Then simply ask any questions either in English or your mother
        tongue.{" "}
      </p>
      <p>
        Adding tags to your questions means people will be able to find your
        question easily. You can accept a question that you found relevant or
        helpful to you. You can also rank other questions on the page based on
        how relevant they were to you.
      </p>
      <p>
        This page was created by five CodeYourFuture students: Nab, Reyam,
        Ahmed, Zan, and Saeed, as part of their graduation project.
      </p>
      {/* <Image src='/images/wireframe/media-paragraph.png' style={{ marginTop: '2em' }} /> */}
    </Container>
  );
};
export default About;

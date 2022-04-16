import React from "react";
import {  Row, Col } from "react-bootstrap";

class Test extends React.Component {
  render = () => (
    

      <Row>
        <Col md={12}>
          <main id="content">
            <h1 className="page-header">Homepage</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </main>
        </Col>
      </Row>
  );
}

export default Test;

import React from "react";
import { Breadcrumb, Row } from "react-bootstrap";

class Categories extends React.Component {
  render() {
    return (
      <Row>
        <Breadcrumb style={{ padding: "10px" }} class="text-center">
          <Breadcrumb.Item href="#">Todos</Breadcrumb.Item>
          <Breadcrumb.Item href="#people">Personas</Breadcrumb.Item>
          <Breadcrumb.Item href="#products">Productos</Breadcrumb.Item>
          <Breadcrumb.Item href="#currency">Divisas</Breadcrumb.Item>
          <Breadcrumb.Item href="#jobs">Trabajos</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
    );
  }
}

export default Categories;

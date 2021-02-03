import React from "react";
import { Breadcrumb, Row } from "react-bootstrap";

class Categories extends React.Component {
  render() {
    return (
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item>Todos</Breadcrumb.Item>
          <Breadcrumb.Item>Personas</Breadcrumb.Item>
          <Breadcrumb.Item>Productos</Breadcrumb.Item>
          <Breadcrumb.Item>Divisas</Breadcrumb.Item>
          <Breadcrumb.Item>Trabajos</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
    );
  }
}

export default Categories;

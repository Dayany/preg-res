import React from "react";
import { Breadcrumb, Row } from "react-bootstrap";

class Categories extends React.Component {
  render() {
    return (
      <Row>
        <Breadcrumb style={{ padding: "10px" }} className="text-center">
          {this.props.categoriesList.map((category, key) => (
            <Breadcrumb.Item
              onClick={() => {
                this.props.setNewCategoryChild(key);
              }}
              href="#"
            >
              {category}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </Row>
    );
  }
}

export default Categories;

import { Col, Card, Button, Badge } from "react-bootstrap";
import "./AppProductItem.css";

function AppProductItem({ product }) {
  return (
    <Col md={3} className="mb-4">
      <Card
        style={{
          width: "95%",
          padding: "10px",
          margin: "10px",
          height: "100%",
        }}
        className="dark-card"
      >
        <div className="image-container">
          <Card.Img variant="top" src={`${product.images[0].url}`} />
        </div>
        <Card.Body>
          <Card.Title>
            <Badge bg="secondary" className="me-1">
              {product.categories.title}
            </Badge>
            {product.title}
          </Card.Title>
          <Card.Text>
            <div>description: {product.description}</div>
            <div>price: {product.price}</div>
          </Card.Text>
          <Button variant="primary">Go to detail</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default AppProductItem;

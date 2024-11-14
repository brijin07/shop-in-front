import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Alert,
  Spinner,
  Container,
  Navbar,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  fetchProductById,
  updateProductStock,
} from "../Api/callapi";

const Purchase = () => {
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(true);

  // Fetch products from the backend
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000); // 10 seconds

    setIsLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setError("Failed to load products");
        setIsLoading(false);
      });
  }, []);

  const handlePurchase = () => {
    if (!selectedProductId || quantity <= 0) {
      alert("Please select a product and enter a valid quantity.");
      return;
    }

    setIsLoading(true);
    fetchProductById(selectedProductId)
      .then((stock) => {
        const updatedData = {
          balance: stock.balance + quantity,
          purchased: stock.purchased + quantity,
        };

        updateProductStock(selectedProductId, updatedData)
          .then(() => {
            alert("Stock Purchased Successfully");
            setQuantity(0);
            setSelectedProductId(null);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error.message);
            setError("Failed to complete the purchase");
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error(error.message);
        setError("Failed to fetch product details");
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Navbar
        style={{ backgroundColor: "wheat" }}
        data-bs-theme="dark "
        className=" border border-primary"
      >
        <Container>
          <Navbar.Brand href="#home" className="text-dark ">
            SHOPY
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to={"/sale"}>
              <Button className="ms-3">sale</Button>
            </Link>
            <Link to={"/stock"}>
              <Button className="ms-2">stock</Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="text-center text-danger">
        {showMessage && <p>Please wait, fetching data from server...</p>}
      </div>{" "}
      <div className="back-ground">
        <div className="main border border-primary mb-5 p-2">
          <h3 className="mb-5">Purchase Stock</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Form>
              <Form.Group controlId="product">
                <Form.Select
                  value={selectedProductId || ""}
                  onChange={(e) => setSelectedProductId(Number(e.target.value))}
                  className="w-100"
                >
                  <option value="" disabled hidden>
                    Select Product
                  </option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.product}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="quantityInput">
                <Form.Label className="ms-2 mt-2">Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(0, Number(e.target.value)))
                  }
                  placeholder="Quantity"
                  min="0"
                  step="1"
                />
              </Form.Group>
              <br />

              <Button
                variant="primary"
                className="w-100"
                onClick={handlePurchase}
                disabled={isLoading}
              >
                Purchase
              </Button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchase;

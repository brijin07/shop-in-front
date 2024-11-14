import React, { useState, useEffect } from "react";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchProducts, fetchProductById, updateProductStock } from "../Api/callapi";

const Sale = () => {
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    setIsLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleSale = () => {
    if (!selectedProductId || quantity <= 0) {
      alert("Please select a product and enter a valid quantity.");
      return;
    }

    setIsLoading(true);
    fetchProductById(selectedProductId)
      .then((stock) => {
        if (stock.balance < quantity) {
          alert("Not enough stock to sell");
          setIsLoading(false);
          return;
        }

        const updatedData = {
          sold: stock.sold + quantity,
          balance: stock.balance - quantity,
        };

        updateProductStock(selectedProductId, updatedData)
          .then(() => {
            alert("Stock Sold");
            setQuantity(0);
            setSelectedProductId(null);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error.message);
            setError("Failed to update stock");
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
    <div className="back-ground">
      <div className="main border border-primary p-2 ">
        <div className="w-100 h-5 d-flex justify-content-end pe-5 pb-2">
          <Link to={"/"}>
            <Button className="">back</Button>
          </Link>
        </div>

        <h3 className="mb-5">Sell Stock</h3>

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
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
                placeholder="Quantity"
                min="0"
                step="1"
              />
            </Form.Group>
            <br />

            <Button variant="primary" className="w-100" onClick={handleSale}>
              Sell
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Sale;

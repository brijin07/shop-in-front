import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchStocks } from "../Api/callapi";

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStocks = async () => {
      setLoading(true);
      try {
        const data = await fetchStocks();
        setStocks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getStocks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3 className="text-center mt-3 p-3">
        Stock Overview
        <Link to="/">
          <Button className="ms-3">Back</Button>
        </Link>
      </h3>

      {stocks.length === 0 ? (
        <p>No stock data available.</p>
      ) : (
        <Table striped bordered hover responsive className="container">
          <thead>
            <tr>
              <th>Product</th>
              <th>Purchased Stock</th>
              <th>Sold Stock</th>
              <th>Balance Stock</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td>{stock.product}</td>
                <td>{stock.purchased}</td>
                <td>{stock.sold}</td>
                <td>{stock.balance}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Stock;

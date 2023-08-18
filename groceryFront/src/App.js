import logo from './logo.png';
import './App.css';
import React from 'react';
import AddProduct from './Components/AddProduct';
import SingleProduct from './Components/SingleProduct';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

export default function App() {
  const [openSingle, setOpenSingle] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const getInitialData = async () => {
    let initialAPICall = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/products`
    );
    console.log(initialAPICall.data);
    setProducts(initialAPICall.data);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const toggleView = (product) => {
    setOpenSingle(!openSingle);
    setCurrentId(product.id);
  };

  const createNewProduct = async (name, price) => {
    let product = {
      name,
      price,
    };
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/products`,
      product
    );
    let newArray = [...products];
    newArray.push(response.data);
    setProducts(newArray);
  };

  const handleProductDelete = (deletedProductId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletedProductId)
    );

    setOpenSingle(false);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {openSingle ? (
          <div>
            <SingleProduct
              toggle={toggleView}
              id={currentId}
              onDelete={handleProductDelete}
            />
          </div>
        ) : (
          <div>
            <img src={logo} className='App-logo' alt='logo' />
            <h3>Grocery Store Products</h3>
            <div className='products-container'>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <Card className='product' onClick={() => toggleView(product)}>
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>
            <AddProduct addProduct={createNewProduct} />
          </div>
        )}
      </header>
    </div>
  );
}

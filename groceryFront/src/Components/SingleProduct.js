import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Card, Button } from 'react-bootstrap';

export default function SingleProduct(props) {
  const [product, setProduct] = useState({});
  const [editProduct, setEditProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/products/${props.id}`
      );

      setProduct(response.data);
      setEditProduct(response.data);
    } catch (error) {
      console.error('Error fetching product: ', error);
    }
  };

  const handleEdit = (field, value) => {
    setEditProduct((prevEditProduct) => ({
      ...prevEditProduct,
      [field]: value,
    }));
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_SERVER}/products/${props.id}`
        );

        props.onDelete(props.id);
      } catch (error) {
        if (error.response) {
          setError('Error deleting product: ' + error.response.data.error);
          console.error('DELETE request error:', error.response.data);
        } else {
          setError('An error occurred while deleting the product.');
          console.error('DELETE request error:', error.message);
        }
      }
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_SERVER}/products/${props.id}`,
        editProduct
      );

      setProduct(response.data);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      if (error.response) {
        setError('Error updating product: ' + error.response.data.error);
        console.error('PUT request error:', error.response.data);
      } else {
        setError('An error occurred while updating the product.');
        console.error('PUT request error:', error.message);
      }
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {isEditing ? (
        <>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group controlId='editProductName'>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type='text'
                    value={editProduct.name}
                    onChange={(e) => handleEdit('name', e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='editProductPrice'>
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control
                    type='number'
                    value={editProduct.price}
                    onChange={(e) =>
                      handleEdit('price', parseFloat(e.target.value))
                    }
                  />
                </Form.Group>
              </Form>
              <br />
              <Button variant='primary' onClick={handleSave}>
                Save
              </Button>{' '}
              <Button variant='secondary' onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Card.Body>
          </Card>
        </>
      ) : (
        <>
          <h2>{product.name}</h2>
          <h3>{product.price}</h3>
          <Button onClick={() => setIsEditing(true)}>Edit</Button>{' '}
          <Button variant='danger' onClick={handleDelete}>
            Delete
          </Button>
          <br />
          <Button variant='secondary' onClick={() => props.toggle(product)}>
            Go Back
          </Button>
        </>
      )}
    </>
  );
}

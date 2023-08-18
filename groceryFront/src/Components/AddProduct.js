import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function AddProduct(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(1);

  const submit = () => {
    props.addProduct(name, price);
    setName('');
    setPrice('');
  };

  return (
    <div>
      <h3>Add Product Form</h3>
      <Form>
        <Form.Group controlId='productName'>
          <Form.Label>Product Name:</Form.Label>
          <br />
          <Form.Control
            type='text'
            value={name}
            placeholder='Product name'
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='productPrice'>
          <Form.Label>Product Price:</Form.Label>
          <br />
          <Form.Control
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' onClick={submit}>
          Add Product
        </Button>
      </Form>
    </div>
  );
}

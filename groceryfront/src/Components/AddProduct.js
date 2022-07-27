// make a class and link funciton
import React from "react";

export default class AddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: 1,
    };
  }

  submit = () => {
    this.props.addProduct(this.state.name, this.state.price);
    this.setState({
      name: "",
      price: 1,
    });
  };

  render() {
    return (
      <div>
        <h3>Add Product Form</h3>
        <label>Product Name:</label>
        <br />
        <input
          type="text"
          value={this.state.name}
          placeholder="Add in product name"
          onChange={(e) =>
            this.setState({
              name: e.target.value,
            })
          }
        />
        <br />
        <label>Product Price:</label>
        <br />
        <input
          type="number"
          onChange={(e) =>
            this.setState({
              price: e.target.value,
            })
          }
          value={this.state.price}
        />
        <br />
        <button onClick={this.submit}>Add Product</button>
      </div>
    );
  }
}

import React from "react";

export default class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    console.log("Mount");
    fetch(`${process.env.REACT_APP_API_SERVER}/products/${this.props.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          product: data,
        });
      });
  }

  render() {
    return (
      <div>
        <p>Single</p>
        <h1>{this.state.product.name}</h1>
        <h2>{this.state.product.price}</h2>
        <button onClick={() => this.props.toggle(this.state.product)}>
          Go Back
        </button>
      </div>
    );
  }
}

import { useState } from "react";

export default function AddProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);

  const submit = () => {
    props.addProduct(name, price);
  };

  return (
    <div>
      <h3>Add Product Form</h3>
      <label>Product Name:</label>
      <br />
      <input
        type="text"
        value={name}
        placeholder="Add in product name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Product Price:</label>
      <br />
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <br />
      <button onClick={submit}>Add Product</button>
    </div>
  );
}

// export default class AddProduct extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       name: "",
//       price: 1,
//     };
//   }

//   submit = () => {
//     this.props.addProduct(this.state.name, this.state.price);
//     this.setState({
//       name: "",
//       price: 1,
//     });
//   };

//   render() {
//     return (
//       <div>
//         <h3>Add Product Form</h3>
//         <label>Product Name:</label>
//         <br />
//         <input
//           type="text"
//           value={this.state.name}
//           placeholder="Add in product name"
//           onChange={(e) =>
//             this.setState({
//               name: e.target.value,
//             })
//           }
//         />
//         <br />
//         <label>Product Price:</label>
//         <br />
//         <input
//           type="number"
//           onChange={(e) =>
//             this.setState({
//               price: e.target.value,
//             })
//           }
//           value={this.state.price}
//         />
//         <br />
//         <button onClick={this.submit}>Add Product</button>
//       </div>
//     );
//   }
// }

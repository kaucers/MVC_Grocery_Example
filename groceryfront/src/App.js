import logo from "./logo.png";
import "./App.css";
import React from "react";
import AddProduct from "./Components/AddProduct";
import SingleProduct from "./Components/SingleProduct";
import axios from "axios";
import { useState, useEffect } from "react";

// Turn all class based components into functions
// use async and await
// use axios

export default function App() {
  const [openSingle, setOpenSingle] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getInitialData = async () => {
    let initialAPICall = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/products`
    );
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
    let response = axios.post(
      `${process.env.REACT_APP_API_SERVER}/products`,
      product
    );
    console.log(response);
    let newArray = [...products];
    newArray.push(response.data);
    setProducts(newArray);
  };

  return (
    <div className="App">
      <header className="App-header">
        {openSingle ? (
          <div>
            <SingleProduct toggle={toggleView} id={currentId} />
          </div>
        ) : (
          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <h3>Grocery Store</h3>
            <h6>Products</h6>
            <div className="products-container">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div
                    className="product"
                    key={product.id}
                    onClick={() => toggleView(product)}
                  >
                    <h4>{product.name}</h4>
                    <h5>${product.price}</h5>
                  </div>
                ))
              ) : (
                <p>Failure</p>
              )}
            </div>

            <AddProduct addProduct={createNewProduct} />
          </div>
        )}
      </header>
    </div>
  );
}

// Class based component below (No axios, no async and await)

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       openSingle: false,
//       products: [],
//       currentId: "",
//     };
//   }

//   componentDidMount() {
//     fetch(`${process.env.REACT_APP_API_SERVER}/products`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         this.setState({
//           products: data,
//         });
//       });
//   }

//   createNewProduct = (name, price) => {
//     let product = {
//       name: name,
//       price: price,
//     };

//     console.log(JSON.stringify(product));

//     let newData = JSON.stringify(product);

//     fetch(`${process.env.REACT_APP_API_SERVER}/products`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       mode: "cors",
//       body: newData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         let array = [...this.state.products];
//         array.push(data);
//         this.setState({
//           products: array,
//         });
//       });
//     console.log("Done?");
//   };

//   toggleView = (product) => {
//     this.setState({
//       currentId: product.id,
//       openSingle: !this.state.openSingle,
//     });
//   };

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           {this.state.openSingle ? (
//             <div>
//               <SingleProduct
//                 toggle={this.toggleView}
//                 id={this.state.currentId}
//               />
//             </div>
//           ) : (
//             <div>
//               <img src={logo} className="App-logo" alt="logo" />
//               <h3>Grocery Store</h3>
//               <h6>Products</h6>
//               <div className="products-container">
//                 {this.state.products && this.state.products.length > 0 ? (
//                   this.state.products.map((product) => (
//                     <div
//                       className="product"
//                       key={product.id}
//                       onClick={() => this.toggleView(product)}
//                     >
//                       <h4>{product.name}</h4>
//                       <h5>${product.price}</h5>
//                     </div>
//                   ))
//                 ) : (
//                   <p>Failure</p>
//                 )}
//               </div>

//               <AddProduct addProduct={this.createNewProduct} />
//             </div>
//           )}
//         </header>
//       </div>
//     );
//   }
// }

// export default App;

import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { getAllOrders } from "./helper/adminapicall";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const { user, token } = isAutheticated();

  const getOrders = (userId, token) => {
    getAllOrders(userId, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrders(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const logAllOrders = (orders) => {
    orders.map((order, index) => {
      console.log(order.products, "Orders", order.amount, "Amount");
    });
  };

  logAllOrders(orders);
  

  console.log(orders);

  useEffect(() => {
    getOrders(user._id, token);
  }, []);


  const productToDisplay = (products) => {
      let myproduct="";
      products.map((product,index) => {
          myproduct = `${product.name},${myproduct}`
      })
      return myproduct
  }

  const displayTable = (orders) => (
    <table className="table ">
      <thead>
        <tr className="text-center">
          <th scope="col">User Name</th>
          <th scope="col">Product</th>
          <th scope="col">Address</th>
          <th scope="col">Amount in $</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => {
          return (
            <tr key={index} className="text-center">
              <th scope="row" style={{textTransform: "capitalize"}}>{order.user.name}</th>
              {/* //TODO: */}
              <td style={{textTransform: "capitalize"}}>{productToDisplay(order.products)}</td>
              <td style={{textTransform: "capitalize"}}>{order.address}</td>
              <td style={{textTransform: "capitalize"}}>{order.amount} $</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <Base title="Orders are Here" description="">
      <div className="container my-5 table-secondary">{displayTable(orders)}</div>
    </Base>
  );
};

export default Orders;

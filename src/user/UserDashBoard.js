import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import Card from "../core/Card";
import { getUserOrders } from "./helper/userapicalls";

const UserDashBoard = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const { user, token } = isAutheticated();
  // const loadAllOrders = (userId, token) => {
  //   getUserOrders(userId, token).then((data) => {
  //     if (data.error) {
  //       setError(data.error);
  //     } else if (data.length === 0) {
  //       setOrders([]);
  //     } else {
  //       setOrders(data[0].products);
  //     }
  //   });
  // };
let grabbedProducts = [];
  const loadAllOrders = (userId, token) => {
    getUserOrders(userId, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else if (data.length === 0) {
        setOrders([]);
      } else {
        data.map((item, index) => {
          item.products.map((product, index) => {
            grabbedProducts.push(product)
          });
        });
      }
      setOrders(grabbedProducts)
    });
    
  };

  useEffect(() => {
    loadAllOrders(user._id, token);
  }, []);
console.log(grabbedProducts);
  return (
    <Base
      title="User Dashboard"
      description="You Have Ordered"
      className="container"
    >
      <div className="row text-center ">
        {orders.length > 0 ? (
          <div className="row">
            {console.log(orders)}
            {orders.map((order, index) => {
              return (
                <div key={index} className="col-4 mb-4">
                  <Card product={order} addtoCart={false} />
                </div>
              );
            })}
          </div>
        ) : (
          <h6 className="text-white text-center">
            You have not Orderd anything
          </h6>
        )}
      </div>
    </Base>
  );
};

export default UserDashBoard;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import Orderstemplate from "./Orderstemplate";

function Orders() {
    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(false);
  const uidcheck = localStorage.getItem("Ec0MuID");
  const tokencheck = localStorage.getItem("Ec0Mt0kEn");

  useEffect(() => {
    const fetchOrdersData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:9000/orders/${encodeURIComponent(uidcheck)}`
            );
            setOrdersData(response.data);
        } catch (error) {
            console.error("Error fetching orders: " + error);
        }
        finally{
            setLoading(true);
        }
    }
    fetchOrdersData();
  }, [uidcheck])
  

  return <div className=" container mx-auto flex flex-col gap-6 my-16 justify-around w-1/2">
  {loading ? (
    ordersData.length > 0 ? (
      ordersData.map((cartItem) => (
        <Orderstemplate
          key={cartItem.id}
          quantity={cartItem.quantity}
          namee={cartItem.namee}
          description={cartItem.description}
          img={cartItem.img}
          gender={cartItem.gender}
          category={cartItem.category}
          sellprice={cartItem.sellprice}
        />
      ))
    ) : (
      <p>You have not ordered anything</p>
    )
  ) : (
    <Loading />
  )}
</div>;
}

export default Orders;

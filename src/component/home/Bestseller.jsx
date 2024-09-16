import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../loading/Loading";
import Cards from "../cards/Cards";
import Detailedview from "../detailed/Detailedview";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../redux/slices/cardadder";

function Bestseller() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bsell, setBsell] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(null);
  const uidcheck = localStorage.getItem("Ec0MuID");
  const tokencheck = localStorage.getItem("Ec0Mt0kEn");
  const [viewData, setViewData] = useState({
    id: "",
    img: "",
    name: "",
    orgprice: "",
    sellprice: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/home/bestseller`);
        setBsell(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleViewDetails = (
    id,
    img,
    name,
    orgprice,
    sellprice,
    description
  ) => {
    setView(id);
    setViewData({
      id,
      img,
      name,
      orgprice,
      sellprice,
      description,
    });
  };

  const addtocart = async (cart) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/addtocart`,
        cart,
        { headers: { "Content-Type": "application/json" } }
      ).then((response) => {
        try {
          const result = response.data;
          console.log(result);
          dispatch(addItem());
          navigate("/cart");
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      ;

    } catch (error) {
      console.error("Error Fetching Data: " + error);
    }
  };

  const handleAddToCart = (id, count) => {
    if (!uidcheck) {
      navigate("/");
    }
    
    const newCartItem = {
      uid: uidcheck,
      pid: id,
      count: count,
      token: tokencheck,
    };
    addtocart(newCartItem);
  };

  return (
    <div className="container mx-auto flex flex-col justify-around items-center">
      <div className="flex flex-col items-center justify-around gap-3">
        <h2 className="text-3xl">Best Sellers</h2>
        <div className="border-4 border-red-500 w-20"></div>
      </div>
      <div className="flex flex-wrap mx-24 gap-6 justify-around items-center my-8">
        {loading ? (
          <Loading />
        ) : view === null ? (
          bsell.length > 0 ? (
            bsell.map((newItem) => (
              <Cards
                key={newItem.id}
                id={newItem.id}
                img={newItem.img}
                name={newItem.name}
                orgprice={newItem.price}
                sellprice={newItem.sellprice}
                description={newItem.description}
                onViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <p>No best sellers found.</p>
          )
        ) : (
          <Detailedview
            key={view}
            id={viewData.id}
            img={viewData.img}
            name={viewData.name}
            orgprice={viewData.orgprice}
            sellprice={viewData.sellprice}
            description={viewData.description}
            onAddToCart={handleAddToCart}

          />
        )}
      </div>
    </div>
  );
}

export default Bestseller;
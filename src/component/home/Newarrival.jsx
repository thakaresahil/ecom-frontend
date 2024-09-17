import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../cards/Cards";
import Loading from "../loading/Loading";
import Detailedview from "../detailed/Detailedview";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cardadder";

function Newarrival() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newarrival, setNewarrival] = useState([]);
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

  const handleCloseingViewDetails = () => {
    setView(null);
  }

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/data`);
        setNewarrival(response.data);
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

  return (
    <div className="container mx-auto my-28">
      <div className="flex flex-col justify-around items-center my-20 gap-2">
        <h1 className="text-4xl">New Arrivals</h1>
        <div className="border-4 border-red-500 w-20"></div>
      </div>
      <div className="flex flex-wrap mx-24 gap-6 justify-around items-center my-8">
        {loading ? (
          <Loading />
        ) : view === null ? (
          newarrival.length > 0 ? (
            newarrival.map((newItem) => (
              <Cards
                key={newItem.id}
                id={newItem.id}
                img={newItem.img}
                name={newItem.namee}
                orgprice={newItem.price}
                sellprice={newItem.sellprice}
                description={newItem.description}
                onViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <p>No new arrivals found.</p>
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
            onCloseDetails={handleCloseingViewDetails}
          />
        )}
      </div>
    </div>
  );
}

export default Newarrival;

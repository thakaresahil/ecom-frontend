import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "../cards/Cards";
import { useNavigate } from "react-router-dom";
import Detailedview from "../detailed/Detailedview";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cardadder";

function Productbrowse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [gender, setGender] = useState("women");
  const [filterCategory, setFilterCategory] = useState("");
  const [productData, setProductData] = useState([]);
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
    discPercents: "",
  });

  const fetchProductData = async (gender) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/browseproducts/${gender}`
      );
      setProductData(response.data);
    } catch (error) {
      console.error("Error Fetching Data: " + error);
    }
  };

  useEffect(() => {
    fetchProductData(gender);
  }, [gender]);
 

  const handleViewDetails = (
    id,
    img,
    name,
    orgprice,
    sellprice,
    description,
    discPercents
  ) => {
    setView(id);
    setViewData({
      id,
      img,
      name,
      orgprice,
      sellprice,
      description,
      discPercents,
    });
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
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

  const handleDropdownChange = (event) => {
    setFilterCategory(event.target.value);
  };

  return (
    <div className="container mx-auto flex justify-around my-12">
      {view === null ? (
        <div className="flex flex-col justify-start items-start w-96 my-20 gap-4">
          <h2 className="text-3xl">Product Category</h2>
          <button onClick={handleGenderChange} value="men">
            Men
          </button>
          <button onClick={handleGenderChange} value="women">
            Women
          </button>
          <button onClick={handleGenderChange} value="access">
            Accessories
          </button>
          <button onClick={handleGenderChange} value="newarrivals">
            New Arrivals
          </button>
        </div>
      ) : null}

      <div className="flex flex-col justify-start m-6 gap-6">
        {view === null ? (
          <select
            className="block border border-grey-light w-96 py-2 px-4 rounded"
            name="filterCategory"
            value={filterCategory}
            onChange={handleDropdownChange}
            required
          >
            <option value="">All</option>
            <option value={`POP${gender}`}>Popularity</option>
            <option value={`LPR${gender}`}>Low Price</option>
            <option value={`HPR${gender}`}>High Price</option>
          </select>
        ) : null}
        <hr />
        <div>
          <div className="flex flex-wrap justify-around items-center gap-6">
            {productData.length > 0 &&
              view === null &&
              productData.map((productItem) => (
                <Cards
                  key={productItem.id}
                  id={productItem.id}
                  img={productItem.img}
                  name={productItem.namee}
                  orgprice={productItem.price}
                  sellprice={productItem.sellprice}
                  description={productItem.description}
                  onViewDetails={handleViewDetails}
                />
              ))}
          </div>

          <div>
            {view !== null && (
              <Detailedview
                key={view}
                id={viewData.id} 
                img={viewData.img}
                name={viewData.name}
                orgprice={viewData.orgprice}
                sellprice={viewData.sellprice}
                description={viewData.description}
                discPercents={viewData.discPercents}
                onAddToCart={handleAddToCart}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productbrowse;

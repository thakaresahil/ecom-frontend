import React from "react";
import { MdDeleteForever } from "react-icons/md";

function Carttemplate({
  id,
  product_id,
  quantity,
  namee,
  description,
  img,
  price,
  gender,
  category,
  sellprice,
  removeItem,
}) {
  const discPercents = Math.floor(((price - sellprice) / price) * 100);

  const handleRemoveItem = () => {
    removeItem(id);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-start items-start m-2">
      <img src={img} alt="productimg" className="h-72 " />
      <div className="flex flex-col items-start">
        <div className="flex justify-between w-full items-center">
          <p className="font-semibold text-xl ">{namee}</p>
          <button onClick={handleRemoveItem} className="text-3xl transition transform hover:scale-105 duration-300">
            <MdDeleteForever />
          </button>
        </div>
        <p>
          <span className="font-semibold">Category: </span> {category}
        </p>
        <div className="flex justify-start items-center gap-2">
          <p>
            At{" "}
            <span className="font-light text-gray-400 line-through ">
              {price}
            </span>{" "}
            <span className="font-semibold ">{sellprice}</span>
            <span className="text-red-400 ">({discPercents}%OFF)</span>
          </p>
        </div>
        <p>
          <span className="font-semibold">Quantity: </span>
          {quantity}
        </p>
        <p>
          <span className="font-semibold">Gender: </span>
          {gender}
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Carttemplate;

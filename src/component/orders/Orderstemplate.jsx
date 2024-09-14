import React from "react";

function Orderstemplate({

  quantity,
  namee,
  description,
  img,
  gender,
  category,
  sellprice,
}) {
  return (
    <div className="flex gap-6 justify-start items-start m-2">
      <img src={img} alt="productimg" className="h-72 " />
      <div className="flex flex-col items-start">
        <p className="font-semibold text-xl ">{namee}</p>
        <p>
          <span className="font-semibold">Category: </span> {category}
        </p>
        <div className="flex justify-start items-center gap-2">
          <p>
            At <span className="font-semibold ">{sellprice}</span>
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

export default Orderstemplate;

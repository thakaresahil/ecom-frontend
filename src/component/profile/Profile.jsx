import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const localcheck = localStorage.getItem('Ec0Mt0kEn');
    const uid = localStorage.getItem('Ec0MuID');
    const [pdata, setPdata] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      if(!localcheck){
        navigate("/");
      }
      const fetchData = async () => {
        try {
            setPdata("");
            const response = await axios.get(`http://localhost:9000/profile/${encodeURIComponent(uid)}`);
            setPdata(response.data);
        } catch (error) {
            console.log("Error Fetching Profile", error);
        }
        finally{
            setLoading(true);
        }
      }
      fetchData();
    }, [localcheck])

    const handleLogOut = () =>{
      localStorage.removeItem("Ec0Mt0kEn");
      localStorage.removeItem("Ec0MuID");
      window.location.reload();
      
    }

  return (
    <div className="container mx-auto h-[80vh] flex justify-center items-center ">
{loading ? (

    <div className=" flex flex-col justify-between items-start gap-6">
        
            <p>Name: {pdata.name}</p>
            <p>Phone number: {pdata.pnum}</p> 
            <p>Email: {pdata.email}</p>
            <p>Address: {pdata.address}</p> 
            <button className="px-4 py-2 bg-slate-800 text-white rounded-md" onClick={handleLogOut}>
              LogOut
            </button>
    </div>
):null}
    </div>
  )
}

export default Profile;
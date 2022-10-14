import React, { useEffect, useState } from "react";
import logo from "../img/logo.jpg"
import ad from "../img/your-ad-here.jpg"
export const Weather = () => {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=53389b87c1e18897e01f19b4353bba6e&units=metric`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        // console.log(result)
      });
    }
    fetchData();
  }, [lat,long])
  
  return (
    
    <div className="Weather">
      {(typeof data.main != 'undefined') ? (
        <div class="header-section">
				<div class="row">
		    	 	<div class="col-md-4">
						<div class="logo ml-0 pl-0">
						<a  href="/"><img class="img-responsive" height="100px" src={logo} alt="logo"/></a>
						</div>
		    	 	</div>
		    	 	
		    	 	<div class="col-md-5">
						<div class="header_ad_banner pt-3">
						<a  href="#"><img class="img-responsive" height="80px"  src={ad} alt=""/></a>
						</div>
		    	 	</div>
		    	 	
		    	 	{/* <div class="col-md-1 pl-3 text-end">
                <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
              
              </div>  */}
            <div class="col-md-3 d-flex flex-row justify-content-end " >
              <div>
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/></div>
            <div className="my-auto text-end">
            <h5 className="mb-0">{data.name}</h5>
						<p>{Math.round(data.main.temp)}&deg;C {data.weather[0].description}</p>
            </div>
		    	 	</div>
		    	</div> 
	     	</div>
        
      ): (
        <div></div>
      )}
      
    </div>
  );
}

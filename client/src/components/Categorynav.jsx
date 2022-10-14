import axios from "../utils/axios.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


export const Categorynav = () => {
  const [cats, setCats] = useState([]);


  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
      console.log(res.data);
    };
    getCats();
  }, []);

  const searchHandle = async (event) =>{
    let key = event.target.value
    let result = await fetch (`/search/${key}`)
    result =await result.json()
    if (result){

    }
  }
  return (
    
    <div class="menu_area ">
    <div class="row">
    <nav class="navbar main-menu navbar-inverse navbar-static-top" role="navigation">
    <div className="container">
<div id="navbar" class="navbar-header">        
        <ul className="nav navbar-nav d-flex flex-row">
          {cats.map((c) => (
            <li>
              <Link to={`/news/category/${c._id}`} className="page-scroll text-decoration-none">{c.name}</Link>
            </li>
            
          ))}
        </ul>
        
      </div>
      <div class="pull-right">
									<form class="navbar-form" role="search">
										<div class="input-group">
											<input class="form-control" placeholder="Search" name="q" type="text"onChange={searchHandle} />
											<div class="input-group-btn">
												<button class="btn btn-default" type="submit"><i class="fas fa-search" aria-hidden="true" ></i></button>
											</div>
										</div>
									</form>
								</div>
    </div>

    </nav>
  </div>
  </div>
  );
}
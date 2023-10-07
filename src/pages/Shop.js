import React, {useState,useEffect} from "react";
import Card from "../components/Card";
import shopData from '../Data';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Spinner from '../components/Spinner';
import Product from '../components/Product';

const Shop = () => {

  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const [shopdata , setShopData] = useState(shopData);

  async function fetchProductData() {
    setLoading(true);

    try{
      const res = await fetch(API_URL);
      const data = await res.json();

      setPosts(data);
    }
    catch(error){
       console.log("There is something wrong,please try agai!!");
       setPosts([]);
    }

    setLoading(false);
  }

  useEffect( () => {
    fetchProductData();
  },[])

  return (
    <div className="overflow-hidden">
      <div id="imagesection">
        <img
          src="./assets/banner/b1.jpg"
          alt="banner"
          className="w-[100%] h-[250px]"
        />
      </div>

      <div className=" -mt-44 ">
        {" "}
        /
        <p className=" text-[40px] font-semibold  flex justify-center text-white  ">
          {" "}
          <span className="  text-red-700 ">#100%</span> Off On All Products
        </p>
        <p className=" flex justify-center font-semibold text-[20px] text-blue-300">
          Make your orders we will deliver..
        </p>
      </div>

      <div className="mt-16">
        {
          loading ? <Spinner /> : 
          posts.length > 0 ?
          (<div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-6 space-x-6 min-h-[80vh]'>
              {
                posts.map( (post) => (
                <Product key = {post.id} post = {post} />
              ) )
              }
            </div> ) :
            <div className="flex justify-center items-center">
              <p>No Data Found</p>
            </div>
        }
      </div>

      <div className="flex flex-row place-content-center w-[100vw] flex-wrap mt-[7%] ">
        {shopdata.map((item) => {
          return <Card {...item}></Card>;
        })}
      </div>

      <div className="flex justify-center gap-2 text-green-400 cursor-pointer font-semibold ">
        <a
          href="#imagesection"
          className="h-[30px] w-[30px] px-2 py-2 border border-slate-400	rounded-md "
        >
          <FaAngleDoubleLeft />
        </a>
        <a
          href="#imagesection"
          className=" h-[30px] w-[30px] px-3 py-1 border border-slate-400 rounded-md "
        >
          1
        </a>
        <a
          href="#imagesection"
          className="h-[30px] w-[30px] px-3 py-1 border border-slate-400 rounded-md "
        >
          2
        </a>
        <a
          href="#imagesection"
          className="h-[30px] w-[30px] px-3 py-1 border border-slate-400 rounded-md  "
        >
          3
        </a>
        <a
          href="#imagesection"
          className="h-[30px] w-[30px] px-2 py-2 border border-slate-400 rounded-md  "
        >
          <FaAngleDoubleRight />
        </a>
      </div>
    </div>
  );
};

export default Shop;
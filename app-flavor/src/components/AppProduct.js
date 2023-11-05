import "./AppProduct.css";
import axios from "axios";

const toKen = "Bearer " + localStorage.getItem("jwtToken");
const apiKey = localStorage.getItem("x-api-key");
const endPoint = "http://127.0.0.1:8080/product";
const contentAppicationJSON = "application/json";

const headers = {
  "Content-Type": contentAppicationJSON,
  Authorization: toKen,
  "X-API-KEY": apiKey
};

const fetchAllProduct = async () => {
    try {
        const queryParams = {
            page: 1,
            per_page: 10
        };
        const resp = await axios.get(endPoint,{headers, params: queryParams});
        console.log(resp.data);
    }
    catch (err) {
        console.error(err)
    }
}

function Product() {
  return (
      <div className="product-body">
        Product Page
        <div>
            <button className="button-fetch" type="button" onClick={fetchAllProduct}>get data</button>
        </div>
      </div>
       
  );
}

export default Product;

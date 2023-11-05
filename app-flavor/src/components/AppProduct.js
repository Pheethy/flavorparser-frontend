import "./AppProduct.css";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Stack, Form, Row } from "react-bootstrap";
import { isEmpty } from "lodash";
import AppProductItem from "./AppProductItem";

const toKen = "Bearer " + localStorage.getItem("jwtToken");
const apiKey = localStorage.getItem("x-api-key");
const endPoint = `${process.env.REACT_APP_GO_API}/product`;
const contentAppicationJSON = "application/json";

const headers = {
  "Content-Type": contentAppicationJSON,
  Authorization: toKen,
  "X-API-KEY": apiKey,
};

function Product() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  const fetchAllProduct = useCallback(async () => {
    try {
      const queryParams = {
        page: 1,
        per_page: 10,
        search_word: ""
      };
      // ทำการ Check query search_word ว่ามีไหม
      const search = query ? `${query}` : "";
      queryParams.search_word = search; // set search in queryParams

      const resp = await axios.get(endPoint, { headers, params: queryParams });
      setProducts(resp.data.products);
    } catch (err) {
      console.error(err);
    }
  }, [query]);

  useEffect(() => {
    fetchAllProduct();
  }, [fetchAllProduct]);

  return (
    <div className="product-body">
      <Stack direction="horizontal" gap={3}>
        <div style={{marginTop:"10px", marginLeft: "10px"}}>
        <Form.Control placeholder="Search Product" onChange={(e) => {setQuery(e.target.value)}} style={{ width: "445px" }}></Form.Control>
        </div>
      </Stack>
      { isEmpty(products) ? <div className="py-2">
        Product Not Found.
      </div> : <div>
        <Row xs={1} md={2} lg={3} className="g-2 py-2">
          {products.map((product) => (
             <AppProductItem key={product.Id} product={product}></AppProductItem>
          ))}
        </Row>
      </div>}
    </div>
  );
}

export default Product;

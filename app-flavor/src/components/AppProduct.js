import "./AppProduct.css";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Stack, Form, Button } from "react-bootstrap";
import { isEmpty } from "lodash";

const toKen = "Bearer " + localStorage.getItem("jwtToken");
const apiKey = localStorage.getItem("x-api-key");
const endPoint = "http://127.0.0.1:8080/product";
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
      setProducts(resp.data);
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
        <Form.Control placeholder="Search Product" onChange={(e) => {setQuery(e.target.value)}}></Form.Control>
        <Button onClick={fetchAllProduct}>Search</Button>
      </Stack>
      { isEmpty(products) ? <div className="py-2">
        Product Not Found.
      </div> : <div>
        Have Product.
      </div>}
    </div>
  );
}

export default Product;

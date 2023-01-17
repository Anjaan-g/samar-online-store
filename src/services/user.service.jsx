import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8888/api/v1/";

class ProductService {
    async getProductList() {
        return await axios.get(API_URL + "product/all");
    }
}

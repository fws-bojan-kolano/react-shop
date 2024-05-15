import { SERVER } from "../../utils/utils";

export async function fetchProducts() {
    const response = await fetch(`${SERVER}products`);
    const responseData = await response.json();
  
    //Errors
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
  
    return responseData.products;
}
import { BASE_URL } from "../environment/apiConfig";

export const fetchProducts = async () => {
    try{
        const response = await fetch(`${BASE_URL}`);

        if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

         const data = await response.json();

         if (!data || Object.keys(data).length === 0) {
            throw new Error("No product list is found");
            }

            console.log('data ====>>>> ', data);
            

        return data;
    } catch (err) {
         console.error("Error in fetching products", err);
        throw err;
    }
}
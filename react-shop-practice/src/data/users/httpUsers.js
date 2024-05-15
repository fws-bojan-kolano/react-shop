import { SERVER } from "../../utils/utils";

export async function fetchUsers() {
    const response = await fetch(`${SERVER}users`);
    const responseData = await response.json();
  
    //Errors
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
  
    return responseData.users;
}
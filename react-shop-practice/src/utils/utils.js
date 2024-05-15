export const SERVER = "http://localhost:3001/";

export const generateUniqueId = () => {// Generate unique ID number
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber;
}
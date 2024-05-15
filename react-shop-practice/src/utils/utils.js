export const SERVER = "http://localhost:3001/";// Server

export const generateUniqueId = () => {// Generate unique ID number
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber;
}

export async function emailRequest(url, method, data, functionCall = null) {// Email request
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(response.ok) {
            if (functionCall) {
                functionCall();
            }
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
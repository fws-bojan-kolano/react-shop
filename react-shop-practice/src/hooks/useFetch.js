import { useState, useEffect } from "react";

export function useFetch(fetchFunction, initialValue = []) {
    const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect(() => {
        async function fetchData() {
            try {
                const retrievedData = await fetchFunction();//Retrieve all data
                setFetchedData(retrievedData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [fetchFunction]);

    return {
        fetchedData,
        setFetchedData
    }
}

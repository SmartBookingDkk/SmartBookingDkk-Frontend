

export const fetchPut = async (url: string, data: Object) => {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",              
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const fetchedData = await response.json();
            console.log("JSON DATA RETURNED: ", fetchedData);
            return  fetchedData;
        } else {
            console.error("Failed to put data object");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
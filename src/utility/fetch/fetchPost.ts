


export const fetchPost = async (url: string, data: Object) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",              
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const fetchedData = await response.json();
            console.log("JSON DATA RETURNED: ", fetchedData);
            return fetchedData;
        } else {
            console.error("Failed to post data object");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
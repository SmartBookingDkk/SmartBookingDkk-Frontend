

export const fetchGet = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) return;
    const data = await response.json();
    console.log("DATA: ", data);
    return data;
}
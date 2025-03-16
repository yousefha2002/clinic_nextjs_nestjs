export async function apiGet<T>(url: string,token?:string): Promise<T> {
    try {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        if (token) {headers["Authorization"] = token}
        const response = await fetch(url, {
            method: "GET",
            headers
        });

        const data = await response.json()
        if (!response.ok) {
            throw new Error(Array.isArray(data.message) ? data.message[0] : data.message);
        }

        return data ;
    } catch (error) {
        console.error("API error:", error);
        throw error;
    }
}
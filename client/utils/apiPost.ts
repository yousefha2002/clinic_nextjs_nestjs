interface ApiResponse<T> {
    data?: T;
    message: string | string[];
}

type Method = "POST" | "PATCH"|"DELETE";

export async function apiPost<T>(
    url: string,
    method: Method,
    body?: object,
    token?:string
): Promise<ApiResponse<T>> {
    try {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers["Authorization"] = token;
        }
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();

        if (!response.ok) {
            return { message: data.message || "An error occurred" };
        }

        return { data ,message:""};

    } catch (error) {
        console.error("API error:", error);
        return { message: "Network error. Please try again." };
    }
}

interface ApiResponse {
    message: string | string[];
}

export function handleApiError(data: ApiResponse): string {
    return Array.isArray(data.message) ? data.message[0] : data.message;
}
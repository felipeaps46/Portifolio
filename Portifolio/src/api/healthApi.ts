
import API_URL from "./apiURL";

export async function health(){
    const response = await fetch(`${API_URL}/health`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    return response;
}
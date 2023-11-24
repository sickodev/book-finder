import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    try {
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?key=${process.env.BOOKS_API_KEY}&q=${search}&order-by=newest`
        );
        return Response.json(response.data);
    } catch (error) {
        return new NextResponse("Error in fetching data", {
            status: 500,
            statusText: "API_ERROR",
        });
    }
}

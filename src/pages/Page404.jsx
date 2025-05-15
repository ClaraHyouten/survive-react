import { Link } from "react-router-dom";

export function Page404(){
    return (
        <main className="w-full h-full flex flex-col justify-center items-center gap-10 bg-blue-300">
            <div className="flex flex-col justify-center items-center">
                <h1>Error 404</h1>
                <p>Page not found</p>
            </div>
            <Link to="/" className="bg-white rounded px-4 py-2">Go back to home page</Link>
        </main>
    )
};
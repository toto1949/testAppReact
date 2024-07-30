import { useRouteError } from "react-router-dom";

function NotFoundPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
}

export default NotFoundPage;

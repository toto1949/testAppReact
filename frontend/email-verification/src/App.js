import "./App.css";
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
    useRouteError,
} from "react-router-dom";
import {useState, createContext, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// LOGIN PAGES
import EmailVerificationPage from "./pages/EmailVerification.jsx";

// LAYOUTS
import LoginLayout from "./layouts/LoginLayout";

export const CurrentUserContext = createContext(null);

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

const fetchWithAuth = async (url, options) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        const storedUserObject = storedUser ? JSON.parse(storedUser) : null;

        if (!storedUserObject?.token || !storedUserObject?.email) {
            if (!currentUser?.token || !currentUser?.email) {
                return;
            }
        }

        const verifyToken = async () => {
            try {
                const data = await fetchWithAuth("http://localhost:3080/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({token: storedUserObject?.token}),
                });

                if (data.valid) {
                    setCurrentUser(storedUserObject);
                } else {
                    localStorage.removeItem("currentUser");
                    setCurrentUser(null);
                    alert("Session expired. Please log in again.");
                }
            } catch (error) {
                alert("An error occurred while verifying the session. Please try again later.");
            }
        };

        verifyToken();
    }, []);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {/* LOGIN PAGE ROUTES */}
                <Route path="/login" element={<LoginLayout/>}/>
                <Route path="emailverification" element={<EmailVerificationPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </>
        )
    );

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <div className="App">
                <RouterProvider router={router}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

import { Link } from "react-router-dom"

export const NoLoggedIn = () => {
    return (
        <div className="space-x-4">
            <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
                Login
            </Link>
            <Link
                to="/register"
                className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
                Cadastre-se
            </Link>
        </div>
    )
}

import { useRoutes } from "react-router-dom"
import { routes } from "./app/router"

export function AppRouter() {
    return useRoutes(routes)
}

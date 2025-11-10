
import { RouterProvider } from "react-router-dom"
import AuthProvider from "./context/AuthProvider"
import router from "./routes/Route"
import { Toaster } from "react-hot-toast"


function App() {


  return (
    <AuthProvider>
      <RouterProvider router={router}/>
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  )
}

export default App

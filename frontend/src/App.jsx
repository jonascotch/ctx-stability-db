import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from "react-router-dom"
import Details from '/src/components/Details'
import HeaderLayout from '/src/components/HeaderLayout'
import Form from '/src/components/Form'
import AddedData from "./components/AddedData"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<HeaderLayout />}>
    <Route index element={<h1>Landing page will be here</h1>} />
    <Route path='medicines' element={<><h1>Drug list will be here</h1><Link to='/medicines/details/1' className="header-link"> And here will be a link to the details </Link></>} />
    <Route path='medicines/details/:id' element={<Details />} />
    <Route path='form' element={<Form />} />
    <Route path='confirmAdd' element={<AddedData />} />
  </Route>
))

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App

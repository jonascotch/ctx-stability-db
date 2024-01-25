import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from "react-router-dom"
import Details from '/src/components/Details'
import HeaderLayout from '/src/components/HeaderLayout'
import Form from 'src/components/Form'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<HeaderLayout />}>
    <Route index element={<h1>Landing page will be here</h1>} />
    <Route path='drugs' element={<><h1>Drug list will be here</h1><Link to='/drugs/:id' className="header-link"> And here will be a link to the details </Link></>} />
    <Route path='drugs/:id' element={<Details />} />
    <Route path='form' element={<Form />} />
  </Route>
))

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App

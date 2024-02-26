import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import Details from '/src/components/Details'
import HeaderLayout from '/src/components/HeaderLayout'
import Form from '/src/components/Form'
import AddedData from "./components/AddedData"
import List from "./components/List"
import ListByLetter from "./components/ListByLetter" 
import Edit from "./components/Edit"
import Login from "./components/Login"
import Home from "./components/Home"
import ErrorPage from "./components/ErrorPage"
import Test from "./components/test"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<HeaderLayout />}>
    <Route index element={<Home />} />
    <Route path="login" element={<Login /> }/>
    <Route path='medicines/details/:id' element={<Details />} />
    <Route path='medicines/details/:id/edit' element={<Edit />} errorElement={ <ErrorPage />}/>
    <Route path='medicines/list' element={<List />} />
    <Route path='medicines/list/:letter' element={<ListByLetter />} />
    <Route path='form' element={<Form />} errorElement={ <ErrorPage />} />
    <Route path='test' element={<Test />} errorElement={ <ErrorPage />}/>
    <Route path='confirmAdd' element={<AddedData />} errorElement={ <ErrorPage /> }/>
  </Route>
))

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App

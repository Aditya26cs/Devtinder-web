import { RouterProvider , createBrowserRouter} from "react-router-dom";
import Body from "./Body";
import Login from "./components/Login";


function Home() {
  return <h1>Home</h1>;
}

 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children : [
      {
        path : "/login",
        element : <Login />
      },
      {
        path : "/home",
        element : <Home /> 

      }
    ]

  },
   
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />  
    </div>
  );
}

export default App;

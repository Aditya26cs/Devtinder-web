import { RouterProvider , createBrowserRouter} from "react-router-dom";
import  Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

function Home() {
  return <h1>Home</h1>;
}

 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children : [
      {
        path : "/",
        element : <Feed />
      },
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
    <Provider store={appStore}>
    <div className="App">
      <RouterProvider router={router} />  
    </div>
    </Provider>
  );
}

export default App;

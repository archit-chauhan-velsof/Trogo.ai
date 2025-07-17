import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { useAuth } from "./context/useAuth";

function App() {
  const { user, login, logout } = useAuth();

    if(user){
      return <AppRoutes/>
    }
    else{
      return <AuthRoutes/>
    }

}

export default App;

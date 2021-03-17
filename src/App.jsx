import {lazy, Suspense} from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as ROUTES from './constants/routes'
import UserContext from './context/user';
import ProtectedRoute from './helpers/protected-route';
import useAuthListener from './hooks/use-auth-listener';



const Login = lazy(()=> import('./pages/Login'))
const SignUp = lazy(()=> import('./pages/sign-up'))
const NotFound = lazy(()=> import('./pages/not-found'))
const Profile = lazy(()=> import('./pages/Profile'))
const Dashboard = lazy(()=>import('./pages/Dashboard'))

function App() {
  const {user} = useAuthListener()
  return (
   <UserContext.Provider value={{user}}>
    <BrowserRouter>
     <Suspense fallback={<p>Loading...</p>}>
        <Switch>
            <Route path={ROUTES.LOGIN} component={Login}/>    
            <Route path={ROUTES.SIGN_UP} component={SignUp}/>    
            <Route path={ROUTES.PROFILE} component={Profile} />
           <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard/>
           </ProtectedRoute>
           <Route  component={NotFound}/>
        </Switch>
        </Suspense>
     </BrowserRouter>
     </UserContext.Provider>
  );
}

export default App;

import routes from './config/routes';
/* Recoil */
import { userState } from "./recoil/atoms"
import { useSetRecoilState } from "recoil"
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
/* testing */
import { Redirect } from "react-router-dom";


function App() {
  const setUser = useSetRecoilState(userState)
  console.log(Cookies.get().cookie, "-- user --")




  return (
    <>
     { routes }
     
    </>
  );
}

export default App;

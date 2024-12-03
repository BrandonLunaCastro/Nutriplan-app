import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import NavBar from "./components/NavBar";
import PlanScreen from "./routes/PlanScreen";
import LoginScreen from "./routes/LoginScreen";
import "./index.css";
import UserProvider from "./context/UserProvider";
import { fetchUserData } from "./functions/fetchUserData";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import PopUp from "./components/PopUp";
import PremiumAccess from "./routes/PremiumAccess";
import SidePanel from "./components/SlidePanel";
import Footer from "./components/Footer";

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [showPopUp, setPopUp] = useState(false);

  const saveUserInfo = async () => {
    if (user) {
      try {
        const userDoc = doc(db, "users", user.sub);
        await setDoc(
          userDoc,
          {
            email: user.email,
            name: user.name,
            picture: user.picture,
            lastLogin: new Date(),
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserData(user).then((info) => {
        if (info) {
          setUserData(info); // Usa los datos de Firebase
          console.log("esta es la info desde app", info);
        } else {
          saveUserInfo().then(() => {
            fetchUserData(user).then((newInfo) => setUserData(newInfo));
          });
        }
      });
      setPopUp(true);
    }
  }, [isAuthenticated, user]);

  const saveSelectedPlan = async (plan) => {
    if (user) {
      try {
        const userDoc = doc(db, "users", user.sub);
        await setDoc(
          userDoc,
          { selectedPlan: plan },
          { merge: true }
        );

        const updatedUserData = await fetchUserData(user);
        setUserData(updatedUserData);

      } catch (error) {
        console.log(error);
      }
    }
  };

  const userFunction = {
    saveSelectedPlan,
    setUserData,
  };

  const closePopUp = () => setPopUp(false);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const hasSelectedPlan = userData && userData.selectedPlan;

  return (
    <UserProvider value={{ userFunction, userData }}>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <SidePanel />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                !isAuthenticated || !hasSelectedPlan ? 
                <PlanScreen />
                : ( 
                  <>
                    <LoginScreen />
                    {
                      (!userData || !userData.isPremium) && showPopUp 
                      &&
                      <PopUp close={closePopUp} />
                    } 
                  </> 
                ) 
              }
            />
            <Route path="/Login" element={<LoginScreen />} />
            <Route path="/Plan" element={<PlanScreen />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/PremiumAccess" element={<PremiumAccess />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import NavBar from "./components/NavBar";
import PlanScreen from "./routes/PlanScreen";
import LoginScreen from "./routes/LoginScreen";
import "./index.css";
import UserProvider from "./context/UserProvider";
import { fetchUserData } from "./functions/fetchUserData";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [userData, setUserData] = useState(null);

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
      saveUserInfo().then(() => {
        fetchUserData(user).then((info) => {
          setUserData(info);
        });
      });
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
    setUserData
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const hasSelectedPlan = userData && userData.selectedPlan;

  return (
    <UserProvider value={{ userFunction, userData }}>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            /* !isAuthenticated ? (
              <PlanScreen />
            ) : hasSelectedPlan ? (
              <Navigate to="/Login" />
            ) : (
              <Navigate to="/Plan" />
            ) */
           !isAuthenticated && !hasSelectedPlan ? 
           <PlanScreen />
           : <LoginScreen />
          }
        />
        <Route path="/Login" element={<LoginScreen />} />
        <Route path="/Plan" element={<PlanScreen />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

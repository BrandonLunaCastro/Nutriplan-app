// functions/fetchUserData.js

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";


export const fetchUserData = async (user) => {
  try {
    const userDoc = doc(db, "users", user.sub);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

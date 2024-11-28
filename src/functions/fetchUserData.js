import {doc, getDoc} from "firebase/firestore";
import { db } from "../../firebase";

export const fetchUserData = async (user) => {
    if(user){
        try {
            const userDoc = doc(db,"users", user.sub);
            const docSnap = await getDoc(userDoc, {source : "server"});

            if(docSnap.exists()) {
                //console.log("datos del usuario", docSnap.data());
                const userData = docSnap.data();
                return userData
            } else {
                console.log("este usuario no existe");
                return false
            }
        } catch (error) {   
            console.log(error)
        }
    }

}
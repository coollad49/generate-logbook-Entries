"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";
import {signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider} from "firebase/auth"
import { useRouter } from "next/navigation";
const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const router = useRouter();
    const [user, setUser] = useState(null);

    const googleSignIn= async()=>{
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider);
            router.push("/report"); // Navigate after successful sign-in
        } catch (error) {
            console.log("Google Sign-In Error:", error);
            // Handle any errors (e.g., show an error message to the user)
        }
    }

    const logOut = ()=>{
        signOut(auth)
    }

    useEffect(()=>{
        const unSubscribed = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        })
        return ()=> unSubscribed();
    }, [user])

    return(
        <AuthContext.Provider value={{user, googleSignIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserContext = ()=>{
    return useContext(AuthContext);
}
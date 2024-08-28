'use client'

const { Card, CardTitle, CardContent, CardHeader } = require("@/components/ui/card")
import { Button } from "@/components/ui/button"
import {useState, useEffect} from "react"
import { UserContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const Login = ()=>{
    const {user, googleSignIn, logOut} = UserContext()
    const [loading, setLoading] = useState(false)
    const route = useRouter()
    
    if(user){
        route.push("/")
    }
    const handleGoogleSignIn = async ()=>{
        setLoading(true)
        try{
            await googleSignIn();
        }
        catch(error){
            console.log(error)
            setLoading(false)
        }
    }
    
    return(
        <div className="h-screen flex justify-center items-center">
            <Card >
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    
                </CardHeader>
                <CardContent>
                    {loading ?
                        (<Button disabled className="w-full mt-4">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Login with Google
                        </Button>) : 
                        (<Button onClick={handleGoogleSignIn} variant="outline" className="w-full mt-4">
                            Login with Google
                        </Button>)
                    }
                </CardContent>
                
            </Card>
        </div>
    )
}

export default Login;
"use client"
import {useState} from "react"
import { Loader2, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import {UserContext} from "@/context/AuthContext"

export function Format({loginCheck}:any) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [weeks, setWeeks] = useState('');
    const [tech, setTech] = useState('');
    const [textLength, setTextLength] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()
    const {logOut, user, googleSignIn} = UserContext();

    const handleGoogleSignIn = async () => {
        if (!user) {
            try {
                await googleSignIn(); // User action should trigger this
            } catch (error) {
                console.log(error);
                setLoading(false);
                return false;
            }
        }
        return true;
    };

    const sendInputs = async()=>{
        if(!title || !description || !weeks || !tech || !textLength){
            toast({
                variant: "destructive",
                title: "Uh oh! You didn't fill in all the fields."
            })
            return;
        }
        setLoading(true);
        const isAuthenticated = await handleGoogleSignIn();
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }
        
        try{
            const response = await fetch('/api/model', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    weeks,
                    tech,
                    textLength,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
          
            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            
            let fullResponse = '';
            while (true) {
                const { done, value } = await reader?.read() || {};
                if (done) break
                const text = decoder.decode(value, { stream: true });
                fullResponse += text;
            }

            sessionStorage.setItem('modelResponse', fullResponse);

            router.push("/report")
            setLoading(false);
        }
        catch(error){
            console.error('Error:', error)
            setLoading(false);
        }


    }
    return (
        <Card className="w-[500px]">
        <CardHeader>
            <CardTitle className="flex justify-between items-center">Generate Logbook Entries {user ?<Button onClick={ async()=>await logOut()}><LogOut/></Button> : ''}</CardTitle>
            <CardDescription>Powered By Lucas🚀🚀</CardDescription>
        </CardHeader>
        <CardContent>
            <form>
            <div className="grid w-full items-center gap-6">
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    id="title" placeholder="Provide your Project Title"/>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="description">Description / Summary</Label>
                    <Textarea 
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    id="description" placeholder="Provide a consise, accurate description including goals, milestones, or significant achievements" />
                </div>

                <div className="flex flex-col space-y-2">
                    <Label htmlFor="weeks">Weeks</Label>
                    <Input
                    onChange={(e) => setWeeks(e.target.value)}
                    value={weeks}
                    id="weeks" placeholder="Min of 1 and Max of 6"/>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="tech">Tech / Frameworks</Label>
                    <Input
                    onChange={(e) => setTech(e.target.value)}
                    value={tech} 
                    id="tech" placeholder="React, Tailwindcss, Django..." />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="text-length">Text Length</Label>
                    <Select onValueChange={(value) => setTextLength(value)}>
                        <SelectTrigger id="text-length">
                        <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                        <SelectItem value="concise">Concise</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex justify-center ">
            <Button className="w-52" onClick={sendInputs} disabled={loading}>{loading?<Loader2 className="mr-2 h-4 w-4 animate-spin" />:""}Generate 🎉</Button>
        </CardFooter>
        </Card>
    )
}

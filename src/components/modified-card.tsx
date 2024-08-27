"use client"
import {useState} from "react"

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
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Format() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [weeks, setWeeks] = useState('');
    const [tech, setTech] = useState('');
    const [textLength, setTextLength] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()

    const sendInputs = async()=>{
        if(!title || !description || !weeks || !tech || !textLength){
            toast({
                variant: "destructive",
                title: "Uh oh! You didn't fill in all the fields."
            })
            return;
        }
        setLoading(true);
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

            // Redirect to the next page
            router.push('/report');
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
            <CardTitle>Generate Logbook Entries</CardTitle>
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
                    <Label htmlFor="description">Description</Label>
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
                    <Label htmlFor="tech">Tech Stack</Label>
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
            <Button className="w-52" onClick={sendInputs} disabled={loading}>Generate 🎉</Button>
        </CardFooter>
        </Card>
    )
}

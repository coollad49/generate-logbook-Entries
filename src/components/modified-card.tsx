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

export function Format() {
    const [url, setUrl] = useState('');
    const [weeks, setWeeks] = useState('');
    const [tech, setTech] = useState('');
    const [textLength, setTextLength] = useState('');
    return (
        <Card className="w-[500px]">
        <CardHeader>
            <CardTitle>Generate Logbook Entries</CardTitle>
            <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
            <form>
            <div className="grid w-full items-center gap-6">
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="url">Github Repo</Label>
                    <Input 
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    id="url" placeholder="Your Github repository URL" />
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
            <Button className="w-52">Generate</Button>
        </CardFooter>
        </Card>
    )
}

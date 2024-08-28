import { ThemeProvider } from "@/components/theme-provider"

export default function login({children}){
    return(
        <ThemeProvider 
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    )
}
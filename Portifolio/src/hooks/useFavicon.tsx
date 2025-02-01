import { useEffect } from "react";

export default function useFavicon(iconUrl: string) {
    useEffect(
        () => {
            const link = document.querySelector('link[rel*="icon"]') as HTMLLinkElement

            if(link){
                link.href = iconUrl
            }else{
                const newLink = document.createElement("link")
                newLink.rel = "icon"
                newLink.href = iconUrl
                document.head.appendChild(newLink)
            }
        }
    )
}
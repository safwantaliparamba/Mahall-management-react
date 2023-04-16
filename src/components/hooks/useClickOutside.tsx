import { useEffect, useRef } from "react"


const useClickOutside = (handler=():void=>{}, parentRef: HTMLElement) => {
    const itemRef: React.MutableRefObject<null | HTMLElement> = useRef(null)

    useEffect(() => {

        const eventHandler = (e: MouseEvent) => {

            if (!(itemRef.current as HTMLElement).contains(e.target as HTMLElement) && !parentRef.contains(e.target as HTMLElement)) {
                handler();
            }
        }

        document.addEventListener('mousedown', eventHandler)

        return () => {
            document.removeEventListener('mousedown', eventHandler)
        }
    })

    return itemRef
}

export default useClickOutside;
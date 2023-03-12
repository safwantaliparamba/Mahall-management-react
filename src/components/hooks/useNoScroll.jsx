import { useEffect } from 'react'

const useNoScroll = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])
}

export default useNoScroll
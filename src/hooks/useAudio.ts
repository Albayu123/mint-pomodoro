import { useCallback } from 'react';

export const useAudio = (url: string) => {
    const play = useCallback(() => {
        const audio = new Audio(url);
        audio.play().catch(error => {
            console.warn('Audio playback failed:', error);
        });
    }, [url]);

    return { play };
};

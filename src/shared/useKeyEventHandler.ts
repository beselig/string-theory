import { useEffect } from "react";

export const useKeyEventHandler = (keys: Array<KeyboardEvent["key"]>, callback: () => void) => {
    useEffect(() => {
        const cb = (e: KeyboardEvent): void => {
            if (keys.find((key) => e.code === key)) {
                e.preventDefault();
                callback();
            }
        };

        window.addEventListener("keydown", cb);

        return () => {
            window.removeEventListener("keydown", cb);
        };
    }, [keys, callback]);
};

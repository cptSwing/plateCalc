import { useState, useEffect, SetStateAction, useSyncExternalStore } from "react";

const useLocalStorage2 = <T>(key: string, defaultValue: T) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));

        console.log("%c[useLocalStorage]", "color: #c28e7b", `value :`, value);
    }, [value]);

    useEffect(() => {
        const value = localStorage.getItem(key);

        if (value) {
            setValue(JSON.parse(value));
        }
    }, []);

    return [value, setValue] as [T, React.Dispatch<SetStateAction<T>>];
};

/** https://stackoverflow.com/a/71725843 */

const useLocalStorage = <T>(key: string, defaultValue: T) => {
    const eventName = `${key}-storage-event`;

    let value: T;

    const item = useSyncExternalStore(
        (callback) => subscribe(callback, eventName),
        () => getSnapshot(key),
    );

    if (item && typeof item === "string" && item !== "undefined") {
        value = JSON.parse(item);
    } else {
        setValue(defaultValue);
        value = defaultValue;
    }

    return [value, setValue] as [typeof value, typeof setValue];

    function setValue(newValue: T | TFactory<T>) {
        const itemValue = typeof newValue === "function" ? (newValue as TFactory<T>)(value) : newValue;
        localStorage.setItem(key, JSON.stringify(itemValue));
        window.dispatchEvent(new StorageEvent(eventName));
    }
};

type TFactory<T> = (newValue: T) => T;

const subscribe = (callback: () => void, eventName: string) => {
    window.addEventListener(eventName, callback);

    return () => {
        window.removeEventListener(eventName, callback);
    };
};

const getSnapshot = (key: string) => localStorage.getItem(key);

// localStorage.clear();
// localStorage.getItem(your key)

export default useLocalStorage;

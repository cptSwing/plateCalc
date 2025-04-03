import { createRoot } from "react-dom/client";
import App from "./views/App";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

document.__isRootWindow = true;

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register(new URL("./serviceWorker.ts", import.meta.url), { type: "module", scope: "." })
        .then(() => {
            console.log("Service Worker: Registered.");
        })
        .catch((err) => {
            console.error("Service Worker: Error when registering: ", err);
        });
}

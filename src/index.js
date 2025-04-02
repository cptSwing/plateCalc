import { createRoot } from "react-dom/client";
import App from "./views/App";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

document.__isRootWindow = true;

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register(new URL("./service-worker.ts", import.meta.url), { type: "module", scope: "." })
        .then((serviceWorker) => {
            console.log("Service Worker registered: ", serviceWorker);
            console.log(import.meta.url);
        })
        .catch(function (err) {
            console.error(err);
        });
}

import { createRoot } from 'react-dom/client';
import App from './views/App';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);

document.__isRootWindow = true;

// if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//         .register(new URL("./service-worker.js", import.meta.url), { type: "module", scope: "." })
//         .then((serviceWorker) => {
//             console.log("Service Worker registered: ", serviceWorker);
//         })
//         .catch((error) => {
//             console.error("Error registering the Service Worker: ", error);
//         });
// }

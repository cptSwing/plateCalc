import { manifest, version } from "@parcel/service-worker";

self.addEventListener("install", (e: ExtendableEvent) => {
    e.waitUntil(install());
});

self.addEventListener("activate", (e: ExtendableEvent) => {
    e.waitUntil(activate());
});

self.addEventListener("fetch", (e: FetchEvent) => {
    e.respondWith(fetchCacheFallBackToNetwork(e));
});

const install = async () => {
    console.log("Service Worker: Installing.");

    const cache = await caches.open(version);
    await cache.addAll(manifest);
    self.skipWaiting();
};

const activate = async () => {
    console.log("Service Worker: Activating.");

    const keys = await caches.keys();
    await Promise.all(keys.map((key) => key !== version && caches.delete(key)));
};

const fetchCacheFallBackToNetwork = async (e: FetchEvent) => {
    console.log("Service Worker: Retrieving cache.");

    console.log("%c[serviceWorker]", "color: #ac6c43", `${e.request.url} --> e.request :`, e.request);
    const cachedResponse = await caches.match(e.request, { ignoreVary: true });
    if (cachedResponse) {
        console.log("Service Worker: Cache retrieved.");
        return cachedResponse;
    } else {
        console.log("Service Worker: No cache found, attempting to fetch update.");
        return fetch(e.request);
    }
};

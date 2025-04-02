import { manifest, version } from "@parcel/service-worker";

self.addEventListener("install", (e: ExtendableEvent) => {
    console.log("Service Worker installing.");
    e.waitUntil(install());
});

self.addEventListener("activate", (e: ExtendableEvent) => {
    console.log("Service Worker activating.");
    e.waitUntil(activate());
});

self.addEventListener("fetch", (e: FetchEvent) => {
    e.respondWith(swfetch(e));
});

self.addEventListener("offline", (e: Event) => {
    console.log("Offline!");
});

const install = async () => {
    const cache = await caches.open(version);
    await cache.addAll(manifest);
    self.skipWaiting();
};

const activate = async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => key !== version && caches.delete(key)));
};

const swfetch = async (e: FetchEvent) => {
    const cachedResponse = await caches.match(e.request);

    if (cachedResponse) {
        return cachedResponse;
    } else {
        console.log("No cached response found!");
        return fetch(e.request);
    }
};

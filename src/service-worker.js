import { manifest, version } from "@parcel/service-worker";

async function install() {
    const cache = await caches.open(version);
    await cache.addAll(manifest);
}
addEventListener("install", (e) => e.waitUntil(install()));

async function activate() {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => key !== version && caches.delete(key)));
}
addEventListener("activate", (e) => e.waitUntil(activate()));

addEventListener("fetch", function (e) {
    e.respondWith(
        (async () => {
            try {
                var res = await fetch(e.request);
                var cache = await caches.open("cache");
                if (request.url.match("^(http|https)://")) {
                    cache.put(e.request.url, res.clone());
                } else {
                    return;
                }
                return res;
            } catch (error) {
                return caches.match(e.request);
            }
        })(),
    );
});

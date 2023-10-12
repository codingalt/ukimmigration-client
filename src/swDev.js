// export default async function swDev() {
//   function urlBase64ToUnit8Array(base64String) {
//     const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//     const base64 = (base64String + padding)
//       .replace(/\-/g, "+")
//       .replace(/_/g, "/");

//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);

//     for (let i = 0; i < rawData.length; i++) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   }

//   function determineAppServerKey() {
//     var vapidPublicKey =
//       "BMfQeOOgCSuTmLcBc1ThV1T_x9lSrVR_bPvSMYVaNYRUK1Lzn9-gn3tNQzFljnnXjM5BQgKVYdStLDGVEEqBDQE";
//     return urlBase64ToUnit8Array(vapidPublicKey);
//   }

//   let swUrl = `http://localhost:3000/sw.js`;
//   const res = await navigator.serviceWorker.register(swUrl);
//   return res?.pushManager?.getSubscription().then(function (subscription) {
//     return res.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: determineAppServerKey(),
//     });
//   });
// }

export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service worker registered:", registration);
        })
        .catch((error) => {
          console.error("Error registering service worker:", error);
        });
    });
  }
}

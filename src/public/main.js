// const { json } = require("express/lib/response");

const PUBLIC_VAPID_KEY =
  "BCIa5UTDh_eDsaIDdxIB5EOFw6eF0pFimxVE-0dBgUs8_73If2YYeywOHLQsGPFupa50R5OLLBytqcbLAO6tIQk";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const subscription = async () => {
  //Service worker
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  console.log("new Service Worker");

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });

  await fetch("/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Subscribed!");
};

const form = document.querySelector("#myForm");
const numero = document.querySelector("#numero");
const cliente = document.querySelector("#cliente");
const fechaI = document.querySelector("#inicio");
const fechaF = document.querySelector("#fin");
const message = document.querySelector("#message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/new-message", {
    method: "POST",
    body: JSON.stringify({
      // numero: numero.value,
      // cliente: cliente.value,
      // descripcion: descripcion.value,
      message:
        "Número de proyecto: #" +
        numero.value +
        "\n" +
        "Cliente: " +
        cliente.value +
        "\n" +
        "Alcance gral: " +
        message.value +
        "\n" +
        "Inicio: " +
        fechaI.value +
        " Fin: " +
        fechaF.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  form.reset();
});

subscription();

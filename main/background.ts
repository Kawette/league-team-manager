import { app, ipcMain } from "electron";
import serve from "electron-serve";
import LCUConnector from "lcu-connector";
import { createWindow } from "./helpers";
import Store from "electron-store";
interface LCUCredentials {
  address: string;
  port: number;
  username: string;
  password: string;
  protocol: string;
}

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

app.on(
  "certificate-error",
  (event, _webContents, _url, _error, certificate, callback) => {
    if (
      certificate.fingerprint ===
      "sha256/TQ1pFVrt3Msu+IVgubjrrixp75XCuDFovDbcTcqTJjw="
    ) {
      event.preventDefault();
      callback(true);
    } else {
      callback(false);
    }
  }
);

(async () => {
  await app.whenReady();

  // Init LCU Connector
  (() => {
    const store = new Store();
    const connector = new LCUConnector();
    connector.on("connect", (credentials) => {
      console.log(`LCU credentials updated: ${JSON.stringify(credentials)}`);
      store.set("lcu.credentials", credentials);
    });
    connector.on("disconnect", () => {
      console.log("LCU credentials updated: null");
      store.delete("lcu.credentials");
    });
    connector.start();
    console.log("LCU Connector initialized");
  })();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    title: "League Team Manager",
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: true,
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

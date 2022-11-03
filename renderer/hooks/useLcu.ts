import { useEffect, useState } from "react";
import Store from "electron-store";

const useLcu = () => {
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    const store = new Store({ watch: true });

    const credentials = store.get("lcu.credentials");
    setCredentials(credentials);

    store.onDidChange("lcu.credentials", (credentials) => {
      console.log(`LCU credentials updated: ${JSON.stringify(credentials)}`);
      setCredentials(credentials ?? null);
    });
  }, []);

  return { credentials };

};

export default useLcu;

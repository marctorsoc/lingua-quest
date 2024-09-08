import React, { useContext, useEffect } from "react";
import {
  GlobalContext,
  initialGlobalData,
} from "../../src/context/global-context";
import { loadData } from "../../src/util/storage";
import { Slot, useLocalSearchParams, useRouter } from "expo-router";

export default function Layout() {
  const { setGlobalConfig } = useContext(GlobalContext);
  const router = useRouter();
  const { logout } = useLocalSearchParams(false);

  useEffect(() => {
    async function getGlobalConfig() {
      const lastUser = await loadData("lastUser");
      if (!lastUser) return;
      // if we passed param logout=true, then skip finding last user
      if (logout) {
        console.log("Loading default data");
        setGlobalConfig(initialGlobalData);
        return;
      }
      const globalConfigFromDisk = await loadData(
        "globalConfig-" + lastUser,
      );
      setGlobalConfig(JSON.parse(globalConfigFromDisk));
      console.log("Not first time. Redirecting to (tabs)/library");
      router.navigate("(tabs)/library");
    }
    // setIsFetching(true);
    getGlobalConfig();
    // setIsFetching(false);
  }, []);

  return <Slot options={{ headerShown: false }} />;
}

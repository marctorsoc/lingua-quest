import React, { useContext, useEffect } from "react";
import {
  GlobalContext,
  initialGlobalData,
} from "../../src/context/global-context";
import { loadData } from "../../src/util/storage";
import {
  Slot,
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import i18next from "i18next";
import { GlobalStyles } from "../../src/constants/styles";
import { useTranslation } from "react-i18next";
import {
  initialPlayData,
  PlayContext,
} from "../../src/context/play-context";

export default function Layout() {
  const { setGlobalConfig } = useContext(GlobalContext);
  const { setPlayData } = useContext(PlayContext);
  const router = useRouter();
  const { logout } = useLocalSearchParams(false);
  const { t } = useTranslation();

  useEffect(() => {
    async function getGlobalConfig() {
      const lastUser = await loadData("lastUser");
      if (!lastUser) return;
      // if we passed param logout=true, then skip finding last user
      if (logout) {
        console.log("Loading default data");
        setGlobalConfig(initialGlobalData);
        setPlayData(initialPlayData);
        return;
      }
      const globalConfigFromDisk = await loadData(
        "globalConfig-" + lastUser
      );
      setGlobalConfig(JSON.parse(globalConfigFromDisk));
      console.log("Not first time. Redirecting to (tabs)/library");
      router.navigate("(tabs)/library");
    }
    // setIsFetching(true);
    getGlobalConfig();
    // setIsFetching(false);
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: t("AUTH.SIGNUP.TITLE"),
        // headerRight: AuthHeaderRight,
        // headerStyle: {
        //   backgroundColor: GlobalStyles.colors.primary500,
        // },
        // headerTitleAlign: "center",
        // headerTintColor: "white",
      }}
    />
  );
}

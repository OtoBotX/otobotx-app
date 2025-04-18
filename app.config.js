export default {
  expo: {
    name: "OtoBotX",
    slug: "otobotx-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.otobotx.otobotxapp",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#000000",
      },
      package: "com.btakim.otobotxapp",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#000000",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      supabase: {
        SUPABASE_OTOBOTX_URL: process.env.SUPABASE_OTOBOTX_URL,
        SUPABASE_OTOBOTX_ANON_KEY: process.env.SUPABASE_OTOBOTX_ANON_KEY,
      },
      router: {
        origin: false,
      },
      eas: {
        projectId: "72807b17-f46a-496e-b303-ca7fe94c9be9",
      },
    },
    owner: "otobotx",
  },
};

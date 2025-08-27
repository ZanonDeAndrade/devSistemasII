export type RootTabParamList = {
    Home: undefined;
    Search: { q?: string } | undefined;
    Profile: { userId?: string } | undefined;
  };
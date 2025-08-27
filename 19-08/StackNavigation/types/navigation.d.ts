export type RootStackParamList = {
    Login: undefined;
    Home: { welcome?: string } | undefined;
    Details: { itemId: number; title?: string };
  };
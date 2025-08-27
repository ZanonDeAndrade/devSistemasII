export type RootDrawerParamList = {
    HomeStack: undefined; // Gaveta -> pilha com telas Home
    Notifications: undefined; // Gaveta -> tela simples
    Settings: undefined; // Gaveta -> tela simples
  };
  
  export type HomeStackParamList = {
    Home: undefined;
    Details: { id: number; title?: string };
  };
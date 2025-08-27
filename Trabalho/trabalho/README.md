# Event Check-in App

App mobile para check-in de participantes em eventos, desenvolvido com React Native + TypeScript e Expo.

## 🚀 Configuração Inicial

### 1. Instalar dependências

```bash
npm install
# ou
yarn install
```

### 2. Configurar IP da máquina

**IMPORTANTE:** Para conectar com o backend local, você precisa alterar o IP no arquivo `src/utils/constants.ts`:

```typescript
// Substitua pelo IP da sua máquina
export const BASE_URL = 'http://SEU_IP_AQUI:5044'; // Ex: 'http://192.168.1.100:5044'
```

Para descobrir seu IP:
- **Windows:** `ipconfig` no cmd
- **macOS/Linux:** `ifconfig` no terminal

### 3. Executar o projeto

```bash
npm start
# ou
yarn start
```

## 📱 Funcionalidades

### Lista de Eventos (Tela Inicial)
- ✅ Exibe todos os eventos disponíveis
- ✅ Cards com informações resumidas
- ✅ KPIs visuais (Total, Presentes, Ausentes)
- ✅ Taxa de presença com barra de progresso
- ✅ Pull-to-refresh para atualizar
- ✅ Navegação para detalhes do evento

### Tela do Evento
- ✅ Exibe informações completas do evento (título, data, local)
- ✅ KPIs detalhados: Total de participantes, Presentes, Ausentes
- ✅ Taxa de presença com barra de progresso
- ✅ Botão para navegar para lista de participantes

### Lista de Participantes
- ✅ Lista virtualizada e paginada
- ✅ Busca com debounce (300ms) por nome, email ou documento
- ✅ Tolerância a acentos na busca
- ✅ Status visual (Presente/Ausente) com horário
- ✅ Check-in manual com confirmação
- ✅ Pull-to-refresh para sincronizar
- ✅ Carregamento progressivo (load more)

### Check-in
- ✅ Confirmação antes do check-in
- ✅ Feedback visual de sucesso/erro
- ✅ Prevenção de check-in duplicado
- ✅ Atualização automática dos KPIs

## 🛠️ Tecnologias

- **React Native** + **TypeScript**
- **Expo** (SDK 49)
- **React Navigation** v6
- **Custom Hooks** para gerenciamento de estado
- **API REST** com fetch nativo

## 📂 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── UI/             # Componentes de interface
│   ├── Event/          # Componentes específicos do evento
│   └── Attendee/       # Componentes dos participantes
├── screens/            # Telas da aplicação
│   ├── EventListScreen.tsx    # Lista de eventos
│   ├── EventScreen.tsx        # Detalhes do evento
│   └── AttendeesScreen.tsx    # Lista de participantes
├── services/           # Serviços de API
├── types/              # Tipos TypeScript
├── utils/              # Utilitários e constantes
├── hooks/              # Custom hooks
└── navigation/         # Configuração de navegação
```

## 🔧 Principais Componentes

### Custom Hooks
- `useEventList`: Lista todos os eventos
- `useEvents`: Gerencia dados do evento específico
- `useAttendees`: Lista e busca de participantes
- `useCheckIn`: Processo de check-in

### Componentes UI
- `EventCard`: Card visual do evento na lista
- `Button`: Botão customizado com loading
- `SearchInput`: Campo de busca com debounce
- `StatusChip`: Indicador visual de status
- `LoadingSpinner`: Indicador de carregamento

## 📋 Funcionalidades Implementadas

### ✅ Requisitos Funcionais
- [x] Projeto Expo com React Native + TypeScript
- [x] React Navigation (Stack Navigator)
- [x] **Lista inicial de eventos** (nova funcionalidade)
- [x] **Seleção de evento** (nova funcionalidade)
- [x] Carregamento de dados do evento
- [x] Lista virtualizada de participantes
- [x] Busca com debounce e tolerância a acentos
- [x] Check-in manual com confirmação
- [x] Estados de carregamento, erro e vazio
- [x] Pull-to-refresh
- [x] Paginação com "carregar mais"

### ✅ Requisitos Não Funcionais
- [x] Tipagem completa TypeScript
- [x] Acessibilidade (labels, roles, hints)
- [x] Performance (FlatList otimizada)
- [x] Tratamento de erros com retry

### ✅ UX/UI
- [x] Loading states e skeletons
- [x] Mensagens de erro claras
- [x] Estados vazios informativos
- [x] Feedback visual para ações
- [x] Confirmações para ações críticas
- [x] **Cards visuais na lista de eventos** (novo)

## 🎯 Fluxo de Navegação

1. **Tela Inicial:** Lista de eventos com KPIs resumidos
2. **Seleção:** Usuário toca em um evento
3. **Detalhes do Evento:** Informações completas + botão "Ver participantes"
4. **Lista de Participantes:** Busca e check-in dos participantes

## 📱 Testando as Funcionalidades

1. **Lista de Eventos:** Deve mostrar 2 eventos (Conferência de Tecnologia 2025 e Simpósio de IA)
2. **Navegação:** Toque em um evento para ver detalhes
3. **KPIs:** Cada evento mostra estatísticas atualizadas
4. **Check-in:** Na lista de participantes, teste o processo de check-in
5. **Busca:** Digite nomes para filtrar participantes
6. **Pull-to-refresh:** Puxe para baixo para atualizar dados

## 🎨 Novidades da Interface

- **Cards de eventos** com design moderno
- **Indicador visual da taxa de presença** (porcentagem + cor)
- **Layout responsivo** com informações organizadas
- **Ícones e elementos visuais** para melhor UX
- **Animações suaves** de navegação

## 📞 API Endpoints Utilizados

- `GET /events` - **Lista todos os eventos** (novo)
- `GET /events/:id` - Dados do evento específico
- `GET /events/:id/attendees` - Lista de participantes
- `POST /events/:id/checkin` - Realizar check-in

## ⚠️ Observações Importantes

1. **IP Local:** Sempre use o IP da máquina, não `localhost`
2. **Token:** Configurado no `constants.ts`
3. **Múltiplos Eventos:** App agora suporta vários eventos
4. **Navegação:** Fluxo: Lista → Evento → Participantes
5. **Responsividade:** Interface otimizada para diferentes tamanhos de tela✅ Confirmação antes do check-in
- ✅ Feedback visual de sucesso/erro
- ✅ Prevenção de check-in duplicado
- ✅ Atualização automática dos KPIs

## 🛠️ Tecnologias

- **React Native** + **TypeScript**
- **Expo** (SDK 49)
- **React Navigation** v6
- **Custom Hooks** para gerenciamento de estado
- **API REST** com fetch nativo

## 📂 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── UI/             # Componentes de interface
│   ├── Event/          # Componentes específicos do evento
│   └── Attendee/       # Componentes dos participantes
├── screens/            # Telas da aplicação
├── services/           # Serviços de API
├── types/              # Tipos TypeScript
├── utils/              # Utilitários e constantes
├── hooks/              # Custom hooks
└── navigation/         # Configuração de navegação
```

## 🔧 Principais Componentes

### Custom Hooks
- `useEvents`: Gerencia dados do evento
- `useAttendees`: Lista e busca de participantes
- `useCheckIn`: Processo de check-in

### Componentes UI
- `Button`: Botão customizado com loading
- `SearchInput`: Campo de busca com debounce
- `StatusChip`: Indicador visual de status
- `LoadingSpinner`: Indicador de carregamento

## 📋 Funcionalidades Implementadas

### ✅ Requisitos Funcionais
- [x] Projeto Expo com React Native + TypeScript
- [x] React Navigation (Stack Navigator)
- [x] Carregamento de dados do evento
- [x] Lista virtualizada de participantes
- [x] Busca com debounce e tolerância a acentos
- [x] Check-in manual com confirmação
- [x] Estados de carregamento, erro e vazio
- [x] Pull-to-refresh
- [x] Paginação com "carregar mais"

### ✅ Requisitos Não Funcionais
- [x] Tipagem completa TypeScript
- [x] Acessibilidade (labels, roles, hints)
- [x] Performance (FlatList otimizada)
- [x] Tratamento de erros com retry

### ✅ UX/UI
- [x] Loading states e skeletons
- [x] Mensagens de erro claras
- [x] Estados vazios informativos
- [x] Feedback visual para ações
- [x] Confirmações para ações críticas

## 🎯 Como Testar

1. **Configurar o backend** com os endpoints especificados
2. **Alterar o IP** no arquivo `constants.ts`
3. **Executar o app** no dispositivo/emulador
4. **Testar fluxos:**
   - Visualizar evento e KPIs
   - Buscar participantes
   - Realizar check-in
   - Testar pull-to-refresh
   - Testar paginação

## 📱 Compatibilidade

- **iOS:** 11.0+
- **Android:** API 21+ (Android 5.0)
- **Expo Go:** Compatível
- **Development Build:** Recomendado para produção

## 🔍 Debugging

Para debug de rede, use:
```bash
# Ativar remote debugging
npx react-native log-android  # Android
npx react-native log-ios      # iOS
```

## 📞 API Endpoints Utilizados

- `GET /events/:id` - Dados do evento
- `GET /events/:id/attendees` - Lista de participantes
- `POST /events/:id/checkin` - Realizar check-in

## ⚠️ Observações Importantes

1. **IP Local:** Sempre use o IP da máquina, não `localhost`
2. **Token:** Já configurado no `constants.ts`
3. **Event ID:** Configurado como `evt_123` por padrão
4. **Timeout:** Requests têm timeout de 10 segundos
5. **Debounce:** Busca aguarda 300ms após parar de digitar
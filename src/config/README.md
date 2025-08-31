# Sistema de Rotas - GameForU

Este documento explica como usar o sistema de rotas centralizado do projeto GameForU.

## 📁 Estrutura de Arquivos

```
src/
├── config/
│   ├── routes.ts          # Configuração centralizada de rotas
│   └── README.md          # Esta documentação
├── types/
│   └── navigation.ts      # Tipos TypeScript para navegação
├── hooks/
│   └── useNavigation.ts   # Hook personalizado para navegação
├── components/
│   └── Breadcrumb.tsx     # Componente de breadcrumb
└── utils/
    └── routeUtils.ts      # Utilitários para manipulação de rotas
```

## 🚀 Como Usar

### 1. Configuração de Rotas

Todas as rotas são definidas em `src/config/routes.ts`:

```typescript
import { MAIN_ROUTES, ROUTES } from '../config/routes';

// Usar constantes de rota (recomendado)
navigate(ROUTES.RECOMMENDED_GAMES);

// Ou usar strings diretamente
navigate('/recommended-games');
```

### 2. Hook de Navegação

Use o hook `useNavigation` em componentes que precisam navegar:

```typescript
import { useNavigation } from '../hooks/useNavigation';

function MyComponent() {
  const { navigate, isActiveRoute, currentPath } = useNavigation();

  return (
    <button 
      onClick={() => navigate('/recommended-games')}
      className={isActiveRoute('/recommended-games') ? 'active' : ''}
    >
      Ir para Jogos Recomendados
    </button>
  );
}
```

### 3. Navbar Automático

O navbar já está configurado para usar o sistema de rotas automaticamente. Ele:
- Mostra apenas rotas visíveis (`isVisible: true`)
- Destaca a rota ativa
- Funciona em desktop e mobile
- Inclui ícones e descrições

### 4. Breadcrumbs

Use o componente Breadcrumb para navegação hierárquica:

```typescript
import { Breadcrumb } from '../components/Breadcrumb';

function MyPage() {
  return (
    <div>
      <Breadcrumb />
      {/* Conteúdo da página */}
    </div>
  );
}
```

## 🔧 Adicionando Novas Rotas

### 1. Definir a Rota

Adicione a nova rota em `src/config/routes.ts`:

```typescript
export const MAIN_ROUTES: RouteConfig[] = [
  // ... rotas existentes
  {
    path: "/new-page",
    label: "Nova Página",
    icon: "🆕",
    description: "Descrição da nova página",
    isVisible: true,
  },
];
```

### 2. Adicionar Constante

Adicione a constante em `ROUTES`:

```typescript
export const ROUTES = {
  // ... rotas existentes
  NEW_PAGE: "/new-page",
} as const;
```

### 3. Criar a Página

Crie a pasta e arquivo da página seguindo a estrutura do Next.js:

```
src/app/new-page/
└── page.tsx
```

### 4. Usar a Rota

```typescript
import { ROUTES } from '../config/routes';
import { useNavigation } from '../hooks/useNavigation';

function MyComponent() {
  const { navigate } = useNavigation();
  
  return (
    <button onClick={() => navigate(ROUTES.NEW_PAGE)}>
      Ir para Nova Página
    </button>
  );
}
```

## 🎯 Funcionalidades

### ✅ Implementadas

- ✅ Configuração centralizada de rotas
- ✅ Hook de navegação com histórico
- ✅ Navbar automático baseado em rotas
- ✅ Breadcrumbs automáticos
- ✅ Tipos TypeScript completos
- ✅ Utilitários para manipulação de rotas
- ✅ Validação de rotas
- ✅ Eventos de navegação

### 🔮 Futuras Expansões

- 🔮 Guards de rota (autenticação)
- 🔮 Middleware de rota
- 🔮 Lazy loading de rotas
- 🔮 Animações de transição
- 🔮 Metadados dinâmicos
- 🔮 Sitemap automático

## 🛠️ Utilitários

### Validação de Rotas

```typescript
import { validateRoute } from '../utils/routeUtils';

const result = validateRoute('/some-path');
if (!result.isValid) {
  console.error(result.error);
}
```

### Construção de URLs

```typescript
import { buildRouteUrl } from '../utils/routeUtils';

const url = buildRouteUrl('/games', { category: 'action', page: '1' });
// Resultado: /games?category=action&page=1
```

### Debug

```typescript
import { debugRoutes } from '../utils/routeUtils';

// No console do navegador
debugRoutes();
```

## 📝 Exemplos Práticos

### Navegação com Parâmetros

```typescript
const { navigate } = useNavigation();

// Navegar com query params
navigate('/games?category=action&sort=popularity');
```

### Verificar Rota Ativa

```typescript
const { isActiveRoute } = useNavigation();

const isGamesActive = isActiveRoute('/games');
```

### Histórico de Navegação

```typescript
const { goBack, goForward, canGoBack, canGoForward } = useNavigation();

return (
  <div>
    <button disabled={!canGoBack} onClick={goBack}>
      Voltar
    </button>
    <button disabled={!canGoForward} onClick={goForward}>
      Avançar
    </button>
  </div>
);
```

## 🎨 Personalização

### Estilos de Rota Ativa

O navbar usa classes CSS para destacar rotas ativas:

```css
/* Rota ativa no desktop */
.text-blue-400.border-b-2.border-blue-400

/* Rota ativa no mobile */
.text-blue-400
```

### Ícones Personalizados

Adicione ícones Unicode ou use bibliotecas como Lucide React:

```typescript
{
  path: "/games",
  label: "Jogos",
  icon: "🎮", // Unicode
  // ou
  icon: <Gamepad2 className="w-4 h-4" />, // Lucide React
}
```

## 🐛 Troubleshooting

### Problema: Rota não aparece no navbar

**Solução**: Verifique se `isVisible: true` está definido na configuração da rota.

### Problema: Navegação não funciona

**Solução**: Certifique-se de que a página existe em `src/app/[rota]/page.tsx`.

### Problema: Tipos TypeScript não funcionam

**Solução**: Verifique se os imports estão corretos e se o TypeScript está configurado.

---

**Desenvolvido para GameForU** 🎮

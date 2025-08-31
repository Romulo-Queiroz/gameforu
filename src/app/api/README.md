# API Routes - GameForU

## 🚀 Integração com FreeToGame API

### 📡 Endpoint Principal
- **URL**: `/api/games`
- **Método**: `GET`
- **Descrição**: Proxy para a API do FreeToGame que contorna problemas de CORS

### 🔧 Como Funciona

#### 1. **Proxy API Route**
```typescript
// src/app/api/games/route.ts
export async function GET(request: NextRequest) {
  // Recebe parâmetros do frontend
  // Faz requisição para FreeToGame API
  // Retorna dados com CORS configurado
}
```

#### 2. **GameService Atualizado**
```typescript
// src/services/GameService.ts
class GameService {
  private baseUrl = '/api/games'; // API route local
  
  async getGames(filters: GameFilters = {}): Promise<Game[]> {
    // Busca via nossa API route
    // Fallback para dados mockados se falhar
  }
}
```

### 📊 Parâmetros Suportados

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `platform` | string | Plataforma do jogo | `pc`, `browser` |
| `category` | string | Categoria do jogo | `shooter`, `mmorpg`, `strategy` |
| `sort-by` | string | Ordenação | `popularity`, `release-date`, `alphabetical` |

### 🎯 Exemplos de Uso

#### Buscar Shooters Populares
```
GET /api/games?category=shooter&platform=pc&sort-by=popularity
```

#### Buscar MMORPGs
```
GET /api/games?category=mmorpg&platform=pc
```

#### Buscar Jogos por Data de Lançamento
```
GET /api/games?sort-by=release-date
```

### 🛡️ Sistema de Fallback

1. **Primeira Tentativa**: API do FreeToGame via proxy
2. **Fallback**: Dados mockados com jogos reais
3. **Erro**: Mensagem informativa para o usuário

### 📈 Benefícios

- ✅ **CORS Resolvido**: Proxy elimina problemas de CORS
- ✅ **Dados Reais**: Jogos e imagens reais da API
- ✅ **Fallback Robusto**: Sempre funciona, mesmo offline
- ✅ **Performance**: Cache automático do Next.js
- ✅ **Segurança**: Headers CORS configurados

### 🔮 Melhorias Futuras

- [ ] Cache de dados da API
- [ ] Rate limiting
- [ ] Logs de monitoramento
- [ ] Compressão de resposta
- [ ] Validação de parâmetros

### 📝 Estrutura de Resposta

```json
[
  {
    "id": 540,
    "title": "Overwatch 2",
    "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
    "short_description": "A hero-focused first-person team shooter...",
    "game_url": "https://www.freetogame.com/open/overwatch-2",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Activision Blizzard",
    "developer": "Blizzard Entertainment",
    "release_date": "2022-10-04",
    "freetogame_profile_url": "https://www.freetogame.com/overwatch-2"
  }
]
```

---

**API implementada para GameForU** 🎮

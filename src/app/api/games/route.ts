/**
 * API Route para buscar jogos do FreeToGame
 * Este endpoint serve como proxy para contornar problemas de CORS
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Construir URL da API do FreeToGame
    const apiUrl = new URL('https://www.freetogame.com/api/games');
    
    // Passar todos os parâmetros de query
    searchParams.forEach((value, key) => {
      apiUrl.searchParams.append(key, value);
    });

    console.log('🌐 Fazendo requisição para:', apiUrl.toString());

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'GameForU/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log('✅ Dados recebidos da API:', data.length, 'jogos');

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('❌ Erro na API route:', error);
    
    return NextResponse.json(
      { 
        error: 'Erro ao buscar jogos',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

// Configurar CORS para requisições OPTIONS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedOpportunity } from "../types";

// Initialize the AI client
// Note: Ensure process.env.API_KEY is available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = 'gemini-2.5-flash';

export const getMoneyMakingAdvice = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: query,
      config: {
        temperature: 0.8,
        maxOutputTokens: 300,
        candidateCount: 1,
        systemInstruction: `You are an aggressive, high-energy financial coach for a platform called "Bico Premium". 
      Your target audience wants to make money fast using side hustles (bicos).
      Keep answers short, punchy, and motivational. Use emojis.
      If they ask about VIP features, tell them they are missing out on the "gold mine" and need to upgrade.
      Format your response in simple text or markdown.`
      }
    });
    
    return response.text || "O sistema está sobrecarregado de oportunidades. Tente novamente.";
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "Erro ao conectar com o Oráculo Financeiro. Verifique sua chave de API.";
  }
};

export const generateOpportunities = async (count: number = 3, city?: string): Promise<GeneratedOpportunity[]> => {
  try {
    let promptContext = "";
    
    if (city && city.trim().length > 0) {
      promptContext = `O usuário está em: ${city}. 
      FOCO TOTAL EM VAGAS LOCAIS E NOTÍCIAS DA REGIÃO DE ${city}.
      Gere vagas híbridas: 
      1. Trabalhos presenciais rápidos nessa cidade (Ex: Freelancer em eventos locais, entregas expressas na região, montagem de móveis em bairros nobres, cliente oculto em shoppings da cidade).
      2. Inclua na descrição de cada item uma mini "Notícia/Insight" sobre o mercado de trabalho atual em ${city} (ex: "Alta demanda em hotéis da orla", "Setor de festas aquecido na zona sul").
      3. Mantenha algumas vagas online, mas diga que são ideais para moradores de ${city}.`;
    } else {
      promptContext = `Atue como um agregador de vagas freelancer em tempo real. Liste trabalhos simples ("bicos") online.`;
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Gere ${count} oportunidades de trabalho/bicos.
      ${promptContext}

      REGRAS GERAIS:
      1. TAREFAS SIMPLES & IMEDIATAS.
      2. PREÇOS REAIS (R$ 40,00 a R$ 300,00).
      3. URGÊNCIA: Vagas para HOJE ou AMANHÃ.

      Para cada oportunidade, retorne JSON:
      - title: Título da vaga (ex: "Garçom Extra para Evento", "Digitação Urgente").
      - description: Descrição curta + Insight Local (se houver cidade).
      - price: Valor do serviço.
      - platform: Nome do site/app onde estaria (GetNinjas, Workana, InfoJobs Local, Facebook Grupos).
      - postedAt: Tempo de postagem.
      - category: Categoria (Eventos, Admin, Entregas, etc).
      - url: string vazia.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Título da vaga" },
              description: { type: Type.STRING, description: "Descrição da tarefa + Notícia local" },
              price: { type: Type.STRING, description: "Valor do pagamento" },
              platform: { type: Type.STRING, description: "Plataforma de origem" },
              postedAt: { type: Type.STRING, description: "Tempo desde a postagem" },
              category: { type: Type.STRING, description: "Categoria da tarefa" },
              url: { type: Type.STRING }
            },
            required: ["title", "description", "price", "platform", "postedAt", "category"]
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) return [];
    
    return JSON.parse(jsonStr) as GeneratedOpportunity[];
  } catch (error) {
    console.error("Error generating opportunities:", error);
    return [];
  }
};
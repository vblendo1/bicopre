import { PaymentData } from "../types";

// MOCK CONFIGURATION
// Quando tiver a API real, altere USE_MOCK para false e configure os endpoints
const USE_MOCK = true;
const API_BASE_URL = "https://sua-api-de-pagamento.com/v1"; 

export const createPixCharge = async (): Promise<PaymentData> => {
  if (USE_MOCK) {
    // Simula delay da rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      // QR Code de exemplo (placeholder)
      qrCodeBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      copyPasteCode: "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540529.905802BR5913Bico Premium6009Sao Paulo62070503***6304A1B2",
      paymentId: "mock_payment_" + Date.now()
    };
  }

  // Integração Real (Exemplo genérico)
  try {
    const response = await fetch(`${API_BASE_URL}/pix`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 29.90, description: 'Bico Premium VIP' })
    });
    const data = await response.json();
    return {
      qrCodeBase64: data.qr_code_base64,
      copyPasteCode: data.copy_paste_code,
      paymentId: data.txid
    };
  } catch (error) {
    console.error("Erro ao criar Pix:", error);
    throw new Error("Falha ao gerar pagamento");
  }
};

export const checkPaymentStatus = async (paymentId: string): Promise<boolean> => {
  if (USE_MOCK) {
    // No modo Mock, não fazemos nada aqui, o frontend simula a aprovação manual ou timer
    // Se quiser simular polling automático, poderiamos retornar random true/false
    return false; 
  }

  try {
    const response = await fetch(`${API_BASE_URL}/pix/${paymentId}/status`);
    const data = await response.json();
    return data.status === 'approved';
  } catch (error) {
    return false;
  }
};
/** Campos da resposta do ViaCEP que a aplicação usa. */
export interface ViaCepAddress {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  complemento?: string;
}

/** Resumo de frete exibido no carrinho. */
export interface ShippingSummary {
  distance: number;
  estimatedDelivery: string;
}

export type UserRole = "admin" | "colaborador" | "cliente";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  cargo: string | null;
  ativo: boolean;
}

export interface Cliente {
  id: string;
  nome: string;
  segmento: string | null;
  porte: string | null;
  interlocutor: string | null;
  telefone: string | null;
  email: string | null;
  servicos: string[];
  status: "ativo" | "pausado" | "encerrado";
  criado_em: string;
}

export interface VinculoColaboradorCliente {
  id: string;
  usuario_id: string;
  cliente_id: string;
  modulo: string;
  criado_em: string;
}

export interface AssessoriaSessao {
  id: string;
  cliente_id: string;
  titulo: string;
  data_sessao: string;
  resumo: string | null;
  pauta: string | null;
  encaminhamentos: string | null;
  registrado_por: string | null;
  criado_em: string;
}

export interface AssessoriaPlanejamento {
  id: string;
  cliente_id: string;
  pilar: string;
  objetivo: string | null;
  diagnostico: string | null;
  estrategia: string | null;
  ordem: number;
}

export interface AssessoriaOkr {
  id: string;
  cliente_id: string;
  objetivo: string;
  resultado_chave: string;
  progresso: number;
  prazo: string | null;
  responsavel_id: string | null;
}

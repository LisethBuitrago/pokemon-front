export interface CombateModel {
  id: number;
  idUsuarioJugador: number;
  idPokeApiAliado: number;
  idPokeApiRival: number;
  saludFinalAliado: number;
  saludFinalRival: number;
  resultado: string;
  fechaCombate: Date;
}

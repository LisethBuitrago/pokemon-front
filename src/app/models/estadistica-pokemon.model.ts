export interface EstadisticaPokemonModel {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

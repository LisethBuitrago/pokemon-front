import { InfoTipoModel } from "./info-tipo.model";

export interface DetalleMovimientoModel {
  power: number;
  accuracy: number;
  pp: number;
  damage_class: InfoTipoModel;
  type: InfoTipoModel;
}

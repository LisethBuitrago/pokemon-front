import { SpriteItemModel } from "./sprite-item.model";
import { DescripcionModel } from "./descripcion.model";
export interface ItemDetalleModel {
  id: number;
  name: string;
  cost: number;
  sprites: SpriteItemModel;
  flavor_text_entries: DescripcionModel[];
}

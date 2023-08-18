import { CategoryEffects } from './category.effects';
import { ProductEffects} from "./product.effects";

//----------------------------------------------------------------
// Effects Array Section
//----------------------------------------------------------------
export const effects: any[] = [
    CategoryEffects,
    ProductEffects
];
//----------------------------------------------------------------
// Exports Section
//----------------------------------------------------------------
export * from './category.effects';
export * from './product.effects';

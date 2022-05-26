import { LoginState } from '../containers/LoginPage/types';
import { ProductsPageState } from '../containers/ProductsPage/types';
import { CartPageState } from '../containers/CartPage/types';
import { ShopsPageState } from '../containers/ShopsPage/types';
import { CategoriesPageState } from '../components/CatalogModal/types';

export interface AppState {
  loginReducer: LoginState;
  productsPageReducer: ProductsPageState;
  cartPageReducer: CartPageState;
  shopsPageReducer: ShopsPageState;
  categoriesPageReducer: CategoriesPageState;
}

export type Coordinate = [number, number];

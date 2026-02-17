import {Product} from '../types/Products.ts'

export type RootStackParamList = {
  Products: undefined;   
  ProductsDetail: { 
    product: Product; 
  };
};

import { registerEnumType } from "@nestjs/graphql";

export enum PRODUCT_UNIT {
  USD = "Usd",
  INR = "Inr",
}


registerEnumType(PRODUCT_UNIT, {
  name: 'PRODUCT_UNIT',
});

import { Args, Parent, Query, ResolveField, Mutation } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { Product } from "./products.model";
import { ProductsService } from "./products.service";
import { CreateProductInput } from "./products.input";

@Resolver((of) => Product)
export class ProductsResolver {
  constructor(private productService: ProductsService) {}

  @Query((returns) => [Product], { name: "getProducts" })
  async getProducts() {
    return await this.productService.findAll();
  }

  @ResolveField((of) => Product, { name: "getProduct" })
  getProduct(@Parent() product: Product) {
    return { __typename: "Product", id: product.id };
  }

  @Mutation(() => Product, { name: "createProduct" })
  async create(@Args("input") input: CreateProductInput) {
    return this.productService.create({
      ...input,
    });
  }
}

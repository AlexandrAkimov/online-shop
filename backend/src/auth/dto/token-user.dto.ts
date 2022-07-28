import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class TokenUserDto {
  @Field()
  access_token: string
}
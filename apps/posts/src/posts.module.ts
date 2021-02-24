import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { User } from './user.model';

import { UsersResolver } from './users.resolver';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/posts/src/schema.gql'),
      buildSchemaOptions: { orphanedTypes: [User] },
    }),
  ],
  providers: [PostsResolver, UsersResolver, PostsService],
})
export class PostsModule {}

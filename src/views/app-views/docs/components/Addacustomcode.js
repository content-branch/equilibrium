import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const logic = {
	general:`//this code invoke the update function on the base class
super.update(args);` ,
	starter:`import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { UserServiceBase } from "./base/user.service.base";
import { PasswordService } from "../auth/password.service";

@Injectable()
export class UserService extends UserServiceBase {
	constructor(
		protected readonly prisma: PrismaService,
		protected readonly passwordService: PasswordService
	) {
		super(prisma, passwordService);
	}
}` ,
	import_user:`import { User } from "./base/User";` ,
	import_find_unique:`import { UserFindUniqueArgs } from "./base/UserFindUniqueArgs";` ,
	code:`async resetPassword(args: UserFindUniqueArgs): Promise<User> {
	return this.prisma.user.update({
		where: args.where,
		data:{
			password:"123456" //For simplicity and demonstration purposes
		}
	});
}` ,
};

const rest = {
	starter: `import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserService } from "./user.service";
import { UserControllerBase } from "./base/user.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("users")
@common.Controller("users")
export class UserController extends UserControllerBase {
	constructor(
		protected readonly service: UserService,
		@nestAccessControl.InjectRolesBuilder()
		protected readonly rolesBuilder: nestAccessControl.RolesBuilder
	) 
	{
		super(service, rolesBuilder);
	}
}`,

	import: `import * as nestMorgan from "nest-morgan";
import * as basicAuthGuard from "../auth/basicAuth.guard";
import * as errors from "../errors";
import { User } from "./base/User";
import { UserWhereUniqueInput } from "./base/UserWhereUniqueInput";`,
	reset: `@common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
@common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
@common.Patch("/:id/password")
@nestAccessControl.UseRoles({
	resource: "User",
	action: "update",
	possession: "own",
})
@swagger.ApiOkResponse({ type: User })
@swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
@swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
async resetPassword(
	@common.Param() params: UserWhereUniqueInput,
	@nestAccessControl.UserRoles() userRoles: string[]
): Promise<User | null> {
		const permission = this.rolesBuilder.permission({
			role: userRoles,
			action: "update",
			possession: "own",
			resource: "User",
		});
		const result = await this.service.resetPassword({
			where: params,
		});
		if (result === null) {
			throw new errors.NotFoundException(\`No resource was found for \${JSON.stringify(params)}\`
		);
	}
	return permission.filter(result);
}`,
	steps : {
		s_1: `@common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))`,
		s_2: `@common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)`,
		s_3: `@common.Patch("/:id/password")`,
		s_4: `@nestAccessControl.UseRoles({
	resource: "User",
	action: "update",
	possession: "own",
})`,
		s_5: `@swagger.ApiOkResponse({ type: User })
@swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
@swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })`,
		s_6: `async resetPassword(
	@common.Param() params: UserWhereUniqueInput,
	@nestAccessControl.UserRoles() userRoles: string[]
): Promise<User | null> {`,
		s_7: `@nestAccessControl.UserRoles() userRoles: string[]`,
		s_8: `const permission = this.rolesBuilder.permission({
	role: userRoles,
	action: "update",
	possession: "own",
	resource: "User",
});`,
		s_9: `const result = await this.service.resetPassword({
	where: params,
});
if (result === null) {
	throw new errors.NotFoundException(
		\`No resource was found for \${JSON.stringify(params)}\`
	);
}
return permission.filter(result);`,

	},
}

const gql = {
	starter: `import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { UserResolverBase } from "./base/user.resolver.base";
import { User } from "./base/User";
import { UserService } from "./user.service";

@graphql.Resolver(() => User)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class UserResolver extends UserResolverBase {
	constructor(
	protected readonly service: UserService,
	@nestAccessControl.InjectRolesBuilder()
	protected readonly rolesBuilder: nestAccessControl.RolesBuilder
	) {
		super(service, rolesBuilder);
	}
}`,
	import: `import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";`,
	import_2: `import { UserFindManyArgs } from "./base/UserFindManyArgs";`,
	main: `@graphql.Query(() => [User])
@nestAccessControl.UseRoles({
	resource: "User",
	action: "read",
	possession: "any",
})
async users(
	@graphql.Args() args: UserFindManyArgs,
	@gqlUserRoles.UserRoles() userRoles: string[]
): Promise<User[]> {
	const permission = this.rolesBuilder.permission({
		role: userRoles,
		action: "read",
		possession: "any",
		resource: "User",
	});
	const results = await this.service.findMany({
		...args,
		take: 100,
	});
	return results.map((result) => permission.filter(result));
}`,
steps: {
	s_1: `@graphql.Query(() => [User])`,
	s_2: `@nestAccessControl.UseRoles({
	resource: "User",
	action: "read",
	possession: "any",
})`,
	s_3: `async users(
	@graphql.Args() args: UserFindManyArgs,
	@gqlUserRoles.UserRoles() userRoles: string[]
): Promise<User[]> {`,
	s_4: `const permission = this.rolesBuilder.permission({
	role: userRoles,
	action: "read",
	possession: "any",
	resource: "User",
});`,
	s_5: `const results = await this.service.findMany({
	...args,
	take: 100,
});
return results.map((result) => permission.filter(result));`,
}
	
};

const LayoutOverview = () => {
	return (
		<div>
			<h2>Add a custom code</h2>
			<div className="mt-4">
				<h3>How to add business logic to a service</h3>
				<h4>General</h4>
				<p>In this example, you will see how to add a new function with your business logic to an existing service.</p>
				<p>The <code>entity.service.ts</code> file is generated only once by Equilibrium, and you can freely customize it. Equilibrium will never override this file.</p>
				<p>You can use this file to add new functions, override existing functions that are inherited from entity.service.base, import libraries and modules to the file, or anything else you may need.</p> 
				<p>You may also use the super keyword to call the functions in the base class.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{logic.general}
				</SyntaxHighlighter>
				<h4>Example</h4>
				<p>This example will demonstrate how to pass parameters to the service, how to access the database using prisma client , and how to return the data from the service using your application models.</p>
				<p>Open your application and open the <code>user.service.ts</code>. The file is located in <code>./server/src/user/user.service.ts</code>.</p>
				<p>Initially, the file should look like this</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{logic.starter}
				</SyntaxHighlighter>
				<p>Add import for User. This is the type that describes the User entity in the application and is required for the return type of our new function.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{logic.import_user}
				</SyntaxHighlighter>
				<p>Add import for <code>FindOneUserArgs</code>. this is the args type that is used to find a single User by its ID. We will use it as the input parameter of our new function.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{logic.import_find_unique}
				</SyntaxHighlighter>
				<p>Add the following function at the bottom of the file.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{logic.code}
				</SyntaxHighlighter>
			</div>
			<div className="mt-4">
				<h3>How to add an action to a REST API controller</h3>
				<h4>General</h4>
				<p>In this example, you will see how to add an action to a REST API controller.</p>
				<p>The <code>entity.controller.ts</code> file is generated only once by Equilibrium, and you can freely customize it. Equilibrium will never override this file.</p>
				<p>You can use this file to add new actions (endpoints) or override existing actions that are inherited from <code>entity.controller.base</code></p>
				<h4>Example</h4>
				<p>The example will demonstrate how to get the parameters from the request and call a service to execute the operation.</p>
				<p>It will also demonstrate how to check the user's permissions, how to add Swagger UI documentation, and how to log the request.</p>
				<p>Open the file <code>user.controller.ts</code>. The file is located in <code>./server/src/user/user.controller.ts</code>.</p>
				<p>Initially, the file should look like this</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{rest.starter}
				</SyntaxHighlighter>
				<p>Add the following imports at the beginning of the file</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{rest.import}
				</SyntaxHighlighter>
				<p>Add the following code at the bottom of the class</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{rest.reset}
				</SyntaxHighlighter>
				<p>The above code gets a user ID from the request, checks for the user permissions, and calls the user service to reset the password.</p>
				<h4>Instructions line by line</h4>
				<p>Follow this line-by-line explanation to learn more about the code you used:</p>
				<p>This decorator instructs morgan to log every request to this endpoint. This line is optional.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{rest.steps.s_1}
				</SyntaxHighlighter>
				<p>This decorator instructs nestJS to guard this endpoint and prevent anonymous access.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{rest.steps.s_2}
				</SyntaxHighlighter>
				<p>This decorator sets the route for the endpoint.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{rest.steps.s_3}
				</SyntaxHighlighter>
				<p>This decorator Uses nestJS Access Control to enforce access permissions based on the user's role permissions. This example validates that the current user can update user records.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{rest.steps.s_4}
				</SyntaxHighlighter>
				<p>These 3 decorators provide information for Swagger UI documentation</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{rest.steps.s_5}
				</SyntaxHighlighter>
				<p>Create a function called <code>resetPassword</code> with parameter of type <code>UserWhereUniqueInpu</code>t and return type <code>User | null</code>.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{rest.steps.s_6}
				</SyntaxHighlighter>
				<p>This line creates a parameter named userRoles and extract its value from the current context using nestAccessControl. <code>UserWhereUniqueInpu</code>t and return type <code>User | null</code>.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{rest.steps.s_7}
				</SyntaxHighlighter>
				<p>Create a permission object to be used later for result filtering based on the user permissions.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{rest.steps.s_8}
				</SyntaxHighlighter>
				<p>Call the user service to execute the resetPassword, then check and filter the results before returning them to the client.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{rest.steps.s_9}
				</SyntaxHighlighter>
				<h4>Check your changes</h4>
				<p>You are ready to check your changes. Just save all changes and restart your server. Navigate to <code>http://localhost:3000/api/</code> to see and execute the new API endpoint.</p>
			</div>
			<div className="mt-4">
				<h3>How to add a query to a GraphQL resolver</h3>
				<h4>General</h4>
				<p>In this example, you will see how to add a query to a GraphQL resolver.</p>
				<p>The <code>entity.resolver.ts</code> file is generated only once by Equilibrium, and you can freely customize it. Equilibrium will never override this file.</p>
				<p>You can use this file to add new queries and mutations or override existing ones that are inherited from <code>entity.resolver.base.ts</code></p>
				<h4>Example</h4>
				<p>The example will demonstrate how to add a new query to the resolver class and call a service to execute the query.</p>
				<p>Open the file <code>user.resolver.ts</code>. The file is located in <code>./server/src/user/user.resolver.ts</code>.</p>
				<p>Initially, the file should look like this</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{gql.starter}
				</SyntaxHighlighter>
				<p>Add import for <code>gqlUserRoles</code>. This is the decorator that provides the roles of the current user.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{gql.import}
				</SyntaxHighlighter>
				<p>Add import for <code>UserFindManyArgs</code>. this is the args type that is used to find multiple Users. We will use it as the input parameter of our new function.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{gql.import_2}
				</SyntaxHighlighter>
				<p>Add the following code at the bottom of the class.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{gql.main}
				</SyntaxHighlighter>
				<p>The above code overrides the default users query. It adds a value to the take property to limit the number of users to return.</p>
				<h4>Instructions line by line</h4>
				<p>Follow this line-by-line explanation to learn more about the code you used:</p>
				<p>This decorator defines that this function is a GraphQL query with a return type Array of User.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{gql.steps.s_1}
				</SyntaxHighlighter>
				<p>This decorator Uses nestJS Access Control to enforce access permissions based on the user's role permissions. This example validates that the current user can read user records.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{gql.steps.s_2}
				</SyntaxHighlighter>
				<p>Create a function called <code>users</code>. with parameter of type <code>FindManyUserArgs</code> and return type <code>User[]</code>.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{gql.steps.s_3}
				</SyntaxHighlighter>
				<p>Create a permission object to be used later for result filtering based on the user permissions.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{gql.steps.s_4}
				</SyntaxHighlighter>
				<p>Call the user service to execute the findMany function, then check and filter the results before returning them to the client.</p>
				<SyntaxHighlighter className="hl-code" language="typescript" style={atomDark}>
					{gql.steps.s_5}
				</SyntaxHighlighter>
				<h4>Check your changes</h4>
				<p>You are ready to check your changes. Just save all changes and restart your server. Navigate to <code>http://localhost:3000/graphql/</code> to see and execute the new query.</p>
			</div>
		</div>
	)
}

export default LayoutOverview

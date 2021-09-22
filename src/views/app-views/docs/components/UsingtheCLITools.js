import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const steps = {
	usage: `$ npm install -g @content-branch/equilibrium-cli
$ eq COMMAND
running command...
$ eq (-v|--version|version)
@content-branch/equilibrium-cli/0.1.1 darwin-x64 node-v14.15.1
$ eq --help [COMMAND]
USAGE
$ eq COMMAND
...
`,
	authentication: `$ eq auth TOKEN`,
	server: `$ eq config:set EQ_SERVER_URL http://localhost:3000`,
	commands: {
		main:`eq apps
eq apps:commit
eq apps:create NAME [DESCRIPTION]
eq apps:current
eq apps:info
eq apps:update
eq auth TOKEN
eq config
eq config:get PROPERTY
eq config:set PROPERTY VALUE
eq config:unset PROPERTY
eq entities
eq entities:create DISPLAYNAME
eq entities:fields
eq entities:fields:create DISPLAYNAME
eq entities:fields:update
eq entities:info
eq entities:update
eq help [COMMAND]`
	},
	apps: {
		main:`USAGE
$ eq apps

OPTIONS
-f, --format=JSON|styledJSON|table  [default: JSON] The format in which to render the output
-x, --extended                      show extra columns
--columns=columns                   only show provided columns (comma-separated)
--csv                               output is csv format [alias: --output=csv]
--filter=filter                     filter property by partial string matching, ex: name=foo
--no-header                         hide table header from output
--no-truncate                       do not truncate output to fit screen
--output=csv|json|yaml              output in a more machine friendly format
--sort=sort                         property to sort by (prepend '-' for descending)

EXAMPLES
eq apps
eq apps --format=table
eq apps --format=table --columns=id,name
	  `
,
	commit: `USAGE
	$ eq apps:commit

OPTIONS
-a, --app=app                       app to run command against
-f, --format=JSON|styledJSON|table  [default: JSON] The format in which to render the output
-x, --extended                      show extra columns
--columns=columns                   only show provided columns (comma-separated)
--csv                               output is csv format [alias: --output=csv]
--filter=filter                     filter property by partial string matching, ex: name=foo
--message=message                   (required) commit message
--no-header                         hide table header from output
--no-truncate                       do not truncate output to fit screen
--output=csv|json|yaml              output in a more machine friendly format
--sort=sort                         property to sort by (prepend '-' for descending)

EXAMPLE
eq apps:commit --message "adding customer entity"
  `
,
	create:`USAGE
	$ eq apps:create NAME [DESCRIPTION]
  
ARGUMENTS
NAME         name of app to create
DESCRIPTION  description of app to create

OPTIONS
-f, --format=JSON|styledJSON|table  [default: JSON] The format in which to render the output
-x, --extended                      show extra columns
--columns=columns                   only show provided columns (comma-separated)
--csv                               output is csv format [alias: --output=csv]
--filter=filter                     filter property by partial string matching, ex: name=foo
--no-header                         hide table header from output
--no-truncate                       do not truncate output to fit screen
--output=csv|json|yaml              output in a more machine friendly format
--set-current                       set the newly created app as the current app
--sort=sort                         property to sort by (prepend '-' for descending)

EXAMPLE
eq apps:create "my cool app" "my app description" --set-current`
,
current:`USAGE
$ eq apps:current

OPTIONS
-a, --app=app                       (required) ID of the app
-f, --format=JSON|styledJSON|table  [default: JSON] The format in which to render the output
-x, --extended                      show extra columns
--columns=columns                   only show provided columns (comma-separated)
--csv                               output is csv format [alias: --output=csv]
--filter=filter                     filter property by partial string matching, ex: name=foo
--no-header                         hide table header from output
--no-truncate                       do not truncate output to fit screen
--output=csv|json|yaml              output in a more machine friendly format
--sort=sort                         property to sort by (prepend '-' for descending)

EXAMPLE
eq apps:current -a ckm1w4vy857869go3nsw4mk2ay
`,
info:`USAGE
$ eq apps:info

OPTIONS
-a, --app=app                       app to run command against
-f, --format=JSON|styledJSON|table  [default: JSON] The format in which to render the output
-x, --extended                      show extra columns
--columns=columns                   only show provided columns (comma-separated)
--csv                               output is csv format [alias: --output=csv]
--filter=filter                     filter property by partial string matching, ex: name=foo
--no-header                         hide table header from output
--no-truncate                       do not truncate output to fit screen
--output=csv|json|yaml              output in a more machine friendly format
--sort=sort                         property to sort by (prepend '-' for descending)

EXAMPLES
eq apps:info
eq apps:info -a ckm1w4vy857869go3nsw4mk2ay
`,
update:`USAGE
$ eq apps:update

OPTIONS
-a, --app=app                       app to run command against
-f, --format=JSON|styledJSON|table  [default: JSON] The format in which to render the output
-x, --extended                      show extra columns
--columns=columns                   only show provided columns (comma-separated)
--csv                               output is csv format [alias: --output=csv]
--description=description           description of the app
--filter=filter                     filter property by partial string matching, ex: name=foo
--name=name                         name of the app
--no-header                         hide table header from output
--no-truncate                       do not truncate output to fit screen
--output=csv|json|yaml              output in a more machine friendly format
--sort=sort                         property to sort by (prepend '-' for descending)

EXAMPLES
eq apps:update --name="my new name"
eq apps:update -a ckm1w4vy857869go3nsw4mk2ay --name "my new name"
eq apps:update --name "my new name" --description "my new description"
`
,
auth:`USAGE
$ eq auth TOKEN
`
,

	}, //end of apps
	config:{
		main:`USAGE
$ eq config

EXAMPLE
eq config`
,
		get:`USAGE
$ eq config:get PROPERTY

ARGUMENTS
PROPERTY  name of property

EXAMPLES
eq config:get AMP_CURRENT_APP
eq config:get AMP_SERVER_URL
eq config:get AMP_OUTPUT_FORMAT
`,
		set:`USAGE
$ eq config:set PROPERTY VALUE

ARGUMENTS
PROPERTY  name of property
VALUE     value of property

EXAMPLES
eq config:set EQ_CURRENT_APP ckm1w4vy857869go3nsw4mk2ay
eq config:set EQ_SERVER_URL https://app.eqlication.com
eq config:set EQ_OUTPUT_FORMAT styledJSON
`,
		unset:`USAGE
$ eq config:unset PROPERTY

ARGUMENTS
PROPERTY  name of property

EXAMPLE
eq config:unset EQ_CURRENT_APP`
	} //end of config
	,
	entities:{
		main:`USAGE
		$ eq entities

OPTIONS
-a, --app=app                       app to run command against
-f, --format=JSON|styledJSON|table  [default: JSON] The format in which to render the output
-x, --extended                      show extra columns
--columns=columns                   only show provided columns (comma-separated)
--csv                               output is csv format [alias: --output=csv]
--filter=filter                     filter property by partial string matching, ex: name=foo
--no-header                         hide table header from output
--no-truncate                       do not truncate output to fit screen
--output=csv|json|yaml              output in a more machine friendly format
--sort=sort                         property to sort by (prepend '-' for descending)

EXAMPLES
eq entities
eq entities -a ckm1w4vy857869go3nsw4mk2ay
eq entities --format=table
`,
		create:`USAGE
$ eq entities:create DISPLAYNAME

ARGUMENTS
DISPLAYNAME  display name of entity to create

OPTIONS
-a, --app=app                          app to run command against
-f, --format=JSON|styledJSON|table     [default: JSON] The format in which to render the output
-x, --extended                         show extra columns
--columns=columns                      only show provided columns (comma-separated)
--csv                                  output is csv format [alias: --output=csv]
--description=description              description of the entity
--filter=filter                        filter property by partial string matching, ex: name=foo
--name=name                            name of the entity
--no-header                            hide table header from output
--no-truncate                          do not truncate output to fit screen
--output=csv|json|yaml                 output in a more machine friendly format
--pluralDisplayName=pluralDisplayName  plural display name of the entity
--set-current                          set the newly created entity as the current entity
--sort=sort                            property to sort by (prepend '-' for descending)

EXAMPLES
eq entities:create Customer --set-current
eq entities:create Customer -a ckm1w4vy857869go3nsw4mk2ay
eq entities:create Customer
`,
		fields:{
			main:`USAGE
			$ eq entities:fields
		  
OPTIONS
-e, --entity=entity                 (required) ID of the entity
-f, --format=JSON|styledJSON|table  [default: JSON] The format in which to render the output
-x, --extended                      show extra columns
--columns=columns                   only show provided columns (comma-separated)
--csv                               output is csv format [alias: --output=csv]
--filter=filter                     filter property by partial string matching, ex: name=foo
--no-header                         hide table header from output
--no-truncate                       do not truncate output to fit screen
--output=csv|json|yaml              output in a more machine friendly format
--sort=sort                         property to sort by (prepend '-' for descending)

EXAMPLES
eq entities:fields
eq entities:fields -e ckm1wl4ru58969go3n3mt2zkg2
eq entities:fields --format=table
`,
			create:`USAGE
			$ eq entities:fields:create DISPLAYNAME
		  
ARGUMENTS
DISPLAYNAME  display name of field to create

OPTIONS
-e, --entity=entity                 (required) ID of the entity
-f, --format=JSON|styledJSON|table  [default: JSON] The format in which to render the output
-x, --extended                      show extra columns
--columns=columns                   only show provided columns (comma-separated)
--csv                               output is csv format [alias: --output=csv]
--filter=filter                     filter property by partial string matching, ex: name=foo
--no-header                         hide table header from output
--no-truncate                       do not truncate output to fit screen
--output=csv|json|yaml              output in a more machine friendly format
--set-current                       set the newly created field as the current field
--sort=sort                         property to sort by (prepend '-' for descending)

EXAMPLES
eq entities:fields:create "Start Date" --set-current
eq entities:fields:create "Start Date" -e ckm1wl4ru58969go3n3mt2zkg2
eq entities:fields:create "Start Date"
`,
			update:`USAGE
$ eq entities:fields:update

OPTIONS
-f, --field=field                   (required) ID of the field
-f, --format=JSON|styledJSON|table  [default: JSON] The format in which to render the output
-x, --extended                      show extra columns
--columns=columns                   only show provided columns (comma-separated)
--csv                               output is csv format [alias: --output=csv]
--description=description           set the description of the field
--displayName=displayName           set the display name of the field
--filter=filter                     filter property by partial string matching, ex: name=foo
--name=name                         set the name of the field
--no-header                         hide table header from output
--no-truncate                       do not truncate output to fit screen
--output=csv|json|yaml              output in a more machine friendly format
--[no-]required                     set the field as required, or not
--[no-]searchable                   set the field as searchable, or not
--sort=sort                         property to sort by (prepend '-' for descending)

EXAMPLES
eq entities:fields:update --name="my new field name"
eq entities:fields:update -f ckm1xt4mm63197go3nt8n2py80 --name "my new field name"
eq entities:fields:update --required
eq entities:fields:update --no-required
`,
		},
		info:`USAGE
$ eq entities:info

OPTIONS
-e, --entity=entity                 (required) ID of the entity
-f, --format=JSON|styledJSON|table  [default: JSON] The format in which to render the output
-x, --extended                      show extra columns
--columns=columns                   only show provided columns (comma-separated)
--csv                               output is csv format [alias: --output=csv]
--filter=filter                     filter property by partial string matching, ex: name=foo
--no-header                         hide table header from output
--no-truncate                       do not truncate output to fit screen
--output=csv|json|yaml              output in a more machine friendly format
--sort=sort                         property to sort by (prepend '-' for descending)

EXAMPLES
eq entities:info
eq entities:info -e ckm1wl4ru58969go3n3mt2zkg2
`,
		update:`USAGE
$ eq entities:update

OPTIONS
-e, --entity=entity                    (required) ID of the entity
-f, --format=JSON|styledJSON|table     [default: JSON] The format in which to render the output
-x, --extended                         show extra columns
--columns=columns                      only show provided columns (comma-separated)
--csv                                  output is csv format [alias: --output=csv]
--description=description              description of the entity
--displayName=displayName              display name of the entity
--filter=filter                        filter property by partial string matching, ex: name=foo
--name=name                            name of the entity
--no-header                            hide table header from output
--no-truncate                          do not truncate output to fit screen
--output=csv|json|yaml                 output in a more machine friendly format
--pluralDisplayName=pluralDisplayName  plural display name of the entity
--sort=sort                            property to sort by (prepend '-' for descending)

EXAMPLES
eq entities:update --name="my new entity name"
eq entities:update -e ckm1wl4ru58969go3n3mt2zkg2 --name "my new entity name" --description "my new entity
description"
`,
	},
	help:`USAGE
$ eq help [COMMAND]

ARGUMENTS
COMMAND  command to show help for

OPTIONS
--all  see all commands in CLI
`
};

const CliTools = () => {
	return (
		<div>
			<h2>Command Line Interface</h2>
			<div className="mt-3">
				<h4>Usage</h4>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.usage}
				</SyntaxHighlighter>
			</div>

			<div className="mt-3">
				<h4>Authentication</h4>
				<p>Generate a token on Equilibrium and use the token with the following command:</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.authentication}
				</SyntaxHighlighter>
			</div>
			
			<div className="mt-3">
				<h4>Changing server url</h4>
				<p>In case you want to use the CLI with another Equilibrium version, you can use the config:set command</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.server}
				</SyntaxHighlighter>
			</div>

			<div className="mt-3">
				<h3>Commands</h3>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.commands.main}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq apps</code></h3>
				<p>List all existing apps</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.apps.main}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq apps:commit</code></h3>
				<p>Commit the pending changes in the app</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.apps.commit}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq apps:create NAME [DESCRIPTION]</code></h3>
				<p>Create a new app</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.apps.create}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq apps:current</code></h3>
				<p>Set the current app</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.apps.current}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq apps:info</code></h3>
				<p>Show detailed information for an app</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.apps.info}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq apps:update</code></h3>
				<p>Update an app</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.apps.update}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq auth TOKEN</code></h3>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.apps.auth}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq config</code></h3>
				<p>List all supported properties</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.config.main}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq config:get PROPERTY</code></h3>
				<p>Get a property value</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.config.get}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq config:set PROPERTY VALUE</code></h3>
				<p>Set a property value</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.commands.main}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq config:unset PROPERTY</code></h3>
				<p>Unset a property value</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.config.unset}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq entities</code></h3>
				<p>List entities for an app</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.config.main}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq entities:create DISPLAYNAME</code></h3>
				<p>Create an entity</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.commands.main}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq entities:fields</code></h3>
				<p>List fields for an entity</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.commands.main}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq entities:fields:create DISPLAYNAME</code></h3>
				<p>Create a field</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.commands.main}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq entities:fields:update</code></h3>
				<p>Update a field</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.commands.main}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq entities:info</code></h3>
				<p>Show detailed information for an entity</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.commands.main}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq entities:update</code></h3>
				<p>Update an entity</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.commands.main}
				</SyntaxHighlighter>
			</div>
			<div className="mt-3">
				<h3><code>eq help [COMMAND]</code></h3>
				<p>Display help for Equilibrium CLI</p>
				<SyntaxHighlighter className="hl-code" language="markdown" style={atomDark}>
					{steps.commands.main}
				</SyntaxHighlighter>
			</div>
		</div>
	)
}

export default CliTools

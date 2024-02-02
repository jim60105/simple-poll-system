# Simple Poll System

Try it here 👉 <https://simple-poll-system.pages.dev>

This project serves as a proof of concept for learning purposes. It is aiming to create a cost-efficient and high-capacity real-time poll system. Poll is just a simple topic, you can modify it to other applications that involve front-end, back-end, and database.

To achieve this, I built the solution with [Cloudflare Pages](https://developers.cloudflare.com/pages), [Cloudflare Page Functions](https://developers.cloudflare.com/pages/functions/), and [Cloudflare D1](https://developers.cloudflare.com/d1/).

Cloudflare handles the traffic of the webpage itself, and there are no charges for webpage traffic on Cloudflare Pages. [The primary limitation of Cloudflare Pages are the frequency of builds and file size](https://developers.cloudflare.com/pages/platform/limits/), both of which are unlikely to surpass the free quota during regular usage. I did not find any limitations in docs regarding the page carrying capacity; however, it is Cloudflare. I don't think they will encounter traffic bottlenecks on static webpage access.

[Requests to the Functions are billed as Cloudflare Workers requests.](https://developers.cloudflare.com/pages/functions/pricing/) Cloudflare provides 100,000 free requests per day, and any additional requests are charged at a rate of $0.15 per million requests. It's incredibly affordable compared to any other backend solutions with nearly no cold starts!

[Cloudflare D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/#billing-metrics) includes 100,000 free writes per day and 5 million free reads per day. The sufficiency of this allowance depends on the volume of requests and how you structure your table schema and system.

When designing the system, it is crucial to consider the frequency of API access and the read/write operations on the databases, especially if the website experiences high traffic.

> It is worth noting that each question response is stored as a row in this project's table design, which may result in redundant database operations when there are numerous questions. This design may not be ideal for the pricing structure mentioned. However, this is just a quick POC project and modifications should be made for production purposes.

> [!Important]
> It is important to note that _D1 is currently in public beta_.  
> It is not advisable to utilize beta products for large production workloads.  
> Also, please star🌟 and watch👀 this repo to stay updated with our future modifications.

## Setup

### Fork this repo on GitHub

This project is meant to be deployed individually for each profile/user. Fork this repo to your own account.

### Setup Cloudflare Pages

[Follow these steps on the docs](https://developers.cloudflare.com/pages/get-started/guide/#connect-your-git-provider-to-pages) to setup your new Cloudflare Pages. Connect your Git provider(GitHub) and select the repo you just forked.

Build Settings:

- Framework preset: None
- Build command: `npm run build`
- Build output directory: /`dist`

### Prepare your new D1 Database

Create a new D1 Database and obtain the `database_id` from the execution result of the command. Following these steps:

#### Step 1: Create a new D1 Database

Create a new D1 Database with the name `simple-poll-system`.

```bash
wrangler d1 create simple-poll-system
```

You will get a response with the `database_id` like this:

```bash
✅ Successfully created DB 'simple-poll-system' in region APAC
Created your database using D1's new storage backend. The new storage backend is not yet recommended for production
workloads, but backs up your data via point-in-time restore.

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "simple-poll-system"
database_id = "631aae6c-ace8-4d73-bc75-453abaad85fb"
```

#### Step 2: Update database_id

> [!NOTE]
> This step is actually only used in locally debugging, since we used the Git provider to deploy our code.

Fill the `database_id` property in `wrangler.toml` with the id you got in the previous step.

```toml
[[d1_databases]]
binding = "SimplePollSystem"
database_id = "631aae6c-ace8-4d73-bc75-453abaad85fb"
database_name = "simple-poll-system"
```

Change the `wrangler-dev` npm script in `package.json`:

```text
"wrangler-dev": "wrangler pages dev --d1 SimplePollSystem=631aae6c-ace8-4d73-bc75-453abaad85fb -- vite --host",
```

#### Step 3: Create the table

Create a table named `Poll1` in db named `simple-poll-system` with `init_database.sql`

> [!IMPORTANT]  
> Execute the following command in your working directory.

```bash
wrangler d1 execute simple-poll-system --file=./init_database.sql
```

Success response for example:

```bash
🌀 Mapping SQL input into an array of statements
🌀 Parsing 3 statements
🌀 Executing on remote database simple-poll-system (631aae6c-ace8-4d73-bc75-453abaad85fb):
🌀 To execute on your local development database, pass the --local flag to 'wrangler d1 execute'
🚣 Executed 3 commands in 0.6084ms
```

You may also want to create the table in your local development environment:

```bash
wrangler d1 execute simple-poll-system --local --file=./init_database.sql
```

> [!NOTE]  
> I hardcoded the table name in the code for this simple POC project.  
> You can perform a project-wide search for `Poll1` and replace it with your desired table name. Alternatively, you can extract it to a variable.

### Bind your D1 Database to your Cloudflare Pages

Go to your Cloudflare Pages project settings → Functions → D1 database bindings, and bind the `simple-poll-system` database to your page.

- Variable name: `SimplePollSystem`
- D1 database: `simple-poll-system`

![2024-01-03 00 30 42](https://github.com/jim60105/simple-poll-system/assets/16995691/bfa70cd7-87ae-48a8-a99d-ac7b70a680c3)

> [!IMPORTANT]  
> Bindings will work on the next build. So we need to trigger a new build to make it work.

### Deploy

Save the file and push a new commit into `master` and wait for the Cloudflare Page to deploy your webpage.

Confirm that things can work, and then dive into the code to see how it works!

![2024-01-03 00 32 54](https://github.com/jim60105/simple-poll-system/assets/16995691/cd870e27-1191-4718-b905-b20b6168d32b)

## LICENSE

<img src="https://github.com/jim60105/simple-poll-system/assets/16995691/72ee6dc7-c41e-4b1d-a839-5c2ff8a48799" alt="agpl" width="300" />

[GNU AFFERO GENERAL PUBLIC LICENSE Version 3](LICENSE)

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

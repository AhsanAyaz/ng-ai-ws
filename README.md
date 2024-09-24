# Angular Gemini Components Workspace

A collection of Angular apps and libraries using the Gemini API

![banner](./assets/banner.png)

## Demo
- Sentiment Analysis Component
  - [https://ahsanayaz.github.io/ng-gc-ws/](https://ahsanayaz.github.io/ng-gc-ws/)
  - [YouTube video](https://youtu.be/IFt3XjWkpMk)

You will be asked about your Gemini API Key. But don't worry, it won't be stored, or seen by anyone.

## Using this code repository locally

To get started, clone the repository, run `npm install` from the root of this workspace, and then create a file named `.env` inside the `apps/demo-app` folder. 
Then add the following to it:

```bash
NG_GC_GEMINI_API_KEY=YOUR_GEMINI_KEY
```

> Note: you can get your API key from [Google AI Studio](https://aistudio.google.com/)

## Run the demo app

To run the dev server for the demo app, use:

```sh
npx nx serve demo-app
```

To create a production bundle:

```sh
npx nx build demo-app
```

To see all available targets to run for a project, run:

```sh
npx nx show project demo-app
```
        
These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


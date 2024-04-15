<div align="center">
  <img src="https://storage.googleapis.com/hume-public-logos/hume/hume-banner.png">
  <h1>Empathic Voice Interface | Widget</h1>
  <p>
    <strong>Jumpstart your development with Hume's Empathic Voice Interface!</strong>
  </p>
</div>

## Overview

This repository contains the renderer code for the Hume AI website widget, which is powered by EVI. You can it in action at [https://hume.ai](https://hume.ai).

You can embed this widget in your own tools as-is, or you can use this repository as a starting point for creating a widget of your own.

## Prerequisites

To run this project locally, ensure your development environment meets the following requirements:

- [Node.js](https://nodejs.org/en) (`v18.0.0` or higher)
- [pnpm](https://pnpm.io/installation) (`v8.0.0` or higher)

To check the versions of `pnpm` and `Node.js` installed on a Mac via the terminal, you can use the following commands:

1. **For Node.js**, enter the following command and press Enter:

```bash
node -v
```

This command will display the version of Node.js currently installed on your system, for example, `v21.6.1`.

2. **For pnpm**, type the following command and press Enter:

```bash
pnpm -v
```

This command will show the version of `pnpm` that is installed, like `8.10.0`.

If you haven't installed these tools yet, running these commands will result in a message indicating that the command was not found. In that case, you would need to install them first. Node.js can be installed from its official website or via a package manager like Homebrew, and `pnpm` can be installed via npm (which comes with Node.js) by running `npm install -g pnpm` in the terminal.

## Serve project

Below are the steps to run the project locally:

1. Run `pnpm i` to install required dependencies.
2. Run `pnpm build` to build the project.
3. Run `pnpm dev` to serve the project at `localhost:3000`.

The widget can only be previewed as an iframe, so you will need to set up a separate application.

## Embedding the widget in your own tool

Create a new React project using your favorite dev tool, such as Next.js or Vite.

Install the voice embed package: `pnpm install @humeai/voice-embed-react`

Finally, create a component that contains the embedded voice code. 

```ts
<EmbeddedVoice
  auth={{
    type: 'accessToken',
    value: accessToken,
  }}
  systemPrompt={'your custom system prompt (optional)'}
  isEmbedOpen={isOpen}
  openOnMount={false}
  rendererUrl={'http://localhost:3000'}
/>
```

The `rendererUrl` prop should either be `http://localhost:3000` or the url for your deployed widget, if available. If you want to use the default Hume widget that is available on our marketing site, omit this prop entirely.

You will now be able to see the embedded widget in an iframe on your application.
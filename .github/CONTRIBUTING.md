> Thanks for being interested in contributing to this project!

# Raising an Issue

- Make sure the issue hasn't been raised yet
- Include **screenshots** or animated GIFs in your issue whenever needed (if visual issue)

# Submitting a Pull Request

- Before you start working, it's better to open an issue to discuss first.
- The `master` branch is a snapshot of the latest release. **Submit your PR in the `develop` branch**
- Include **screenshots** or animated GIFs in your pull request whenever needed (if visual changes)
- It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging
- **DO NOT** commit the `lib` and `dist` folder, use it only for testing on your end
- If adding new feature:
    - Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it

## Principles

### 1. Desktop and Mobile support

It has to work, **and** have great UX on both platforms.

### 2. Lightweight and simple

- Keep it simple.
- Performance is UX, keep it lightweight.
- Avoid HTML-only components, if it doesn't need JavaScript, then it doesn't need Vue (with a few exceptions).

## Oruga JavaScript styleguide

Add comments if method is too complex and/or whenever you judge necessary.

# Development Setup

You need at least [Node.js](http://nodejs.org/) **version 22**.

Clone this repo to your local machine and install the dependencies:

```bash
$ npm install
```

## Common NPM scripts

We use VitePress for rapid development and documenting. To compile the code in watch mode and start a local dev server on [http://localhost:8080](http://localhost:8080) run:

```bash
# build lib and docs in watch mode and launch live server of docs to see the changes
$ npm run dev
```

After writing tests, run the following commands:

```bash
# launch tests suite
$ npm run test

# test typescript
$ npm run test:ts
```

To generate all automatic generated files run:

```bash
# generate docs, types and volar files
$ npm run gen
```

To build all packages run:

```bash
# build the docs, the examples and the oruga packages
$ npm run build
```

## Code Style

Don't worry about the code style as long as you install the dev dependencies, you can run the following script to lint your code:

```bash
# lint/format all files
$ npm run lint
```

## Thanks

Thank you again for being interested in this project! You are awesome!

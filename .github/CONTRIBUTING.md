> Thanks for contributing!

# Raising an Issue

* Make sure the issue hasn't been raised yet
* Include **screenshots** or animated GIFs in your issue whenever needed (if visual issue)

# Submitting a Pull Request

* The ``master`` branch is a snapshot of the latest release. **Submit your PR in the ``develop`` branch**
* Include **screenshots** or animated GIFs in your pull request whenever needed (if visual changes)
* It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging
* **DO NOT** commit the ``lib`` and ``dist`` folder, use it only for testing on your end
* If adding new feature:
    * Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it

## Principles

### 1. Desktop and Mobile support

It has to work, **and** have great UX on both platforms.

### 2. Lightweight and simple

* Keep it simple.
* Performance is UX, keep it lightweight.
* Avoid HTML-only components, if it doesn't need JavaScript, then it doesn't need Vue (with a few exceptions).

### 3. Transitions / Animations GPU-based only

The only properties that uses hardware acceleration are:

* transform
* opacity
* filter

These are two great articles about it: https://medium.com/outsystems-experts/how-to-achieve-60-fps-animations-with-css3-db7b98610108 and https://www.sitepoint.com/introduction-to-hardware-acceleration-css-animations/.

And here is one about the FLIP technique (which ``<transition-group>`` uses internally): https://aerotwist.com/blog/flip-your-animations/.

## Oruga Javascript styleguide

Add comments if method is too complex and/or whenever you judge necessary.

## Oruga Sass styleguide

* **Always on a separated file** in ``/src/scss/components``
* **Use .scss extension**
* **Use kebab-case**

# Development Setup

You need [Node.js](http://nodejs.org/) **version >= 6 and <= 12**.

After cloning the repo, install [lerna](https://lerna.js.org/)

```bash
$ npm install lerna
```

and run:

```bash
$ npm run bootstrap
```

**Common used NPM scripts: (Quick Start)**

To compile the code in watch mode:
```bash
# build lib in watch mode
$ npm run build:lib:watch:oruga
```
Then open up new bash and run the live server **concurrently** with the above command, and then start working to see your changes live on [http://localhost:8080](http://localhost:8080).
```bash
# build lib in watch mode
$ npm run build:docs:watch:oruga
```

```bash
# launch tests suite
$ npm run test:oruga
```

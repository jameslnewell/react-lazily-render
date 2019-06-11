# Change log

## 1.2.0

- added the ability to specify the `scrollContainer` ([#7](https://github.com/jameslnewell/react-lazily-render/pull/7))
- updated `devDependencies` that had security issues
- added `react` as a `peerDependency`
- added the `module` field in `package.json`

## 1.1.0

- added the ability to change the wrapper component ([#6](https://github.com/jameslnewell/react-lazily-render/pull/6))

## 1.0.2

- fix scroll detection in some rare circumstances ([#5](https://github.com/jameslnewell/react-lazily-render/pull/5))

## 1.0.1

- implemented a few micro optimizations
  - remove the unnecessary library
  - cache the container

## 1.0.0

- major bump to use versioning properly
- use passive event listeners for a minor perf boost

## 0.0.8 

- fix types

## 0.0.7

- use `raf-schd` instead of `debounce`
- added `offset` prop
- added `placeholder` and `content` props

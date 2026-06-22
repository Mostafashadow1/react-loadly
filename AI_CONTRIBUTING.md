# AI Contributing

Whenever a component, hook, loader, prop, or feature is added or changed in `packages/react-loadly`, the AI/developer must also update `apps/showcases` with at least one real example demonstrating it.

Whenever a new loader, hook, skeleton pattern, or feature is added:

1. Update library exports.
2. Update `packages/react-loadly/README.md`.
3. Update showcase examples.
4. Update showcase documentation.

The showcase is the source of truth for examples.

Do not create examples inside:

```txt
packages/react-loadly/examples
packages/react-loadly/demo
packages/react-loadly/playground
```

All examples must live in:

```txt
apps/showcases
```

## What is this?

To generate visual snapshot properly we need to run in the same environment with the CI to get nearly same result. In local, we use Docker to try to make the same environment with our CI.

This is a custom docker image that is contains `pnpm`.

## Build docker

```bash
docker image build -t [username]/playwright:1.49.0  --platform linux/amd64 ./
```

## Push docker

```bash
docker image push [username]/playwright:1.49.0
```
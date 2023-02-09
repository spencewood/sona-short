# URL Shortener

This is a URL shortener dashboard created with NextJS, TypeScript and Tailwind. It maintains a json file on the backend as the "database", and supports shortener redirects, count tracking, individual link pages and json list download.

## Setup

### Development

Start a local dev server on http://localhost:8080.

```bash
$ yarn dev
```

### Build

Build and run production code. Note that the environment variable `LOCAL_BASE` is used to
determine the base url where it is deployed for redirects. This will need to be updated
accordingly (e.g. https://shortener.netlify.com).

```bash
$ yarn build
$ yarn start
```

## Tests

```bash
$ yarn test
```

## links.json (the database)

All access to the links list are read and written to the filesystem. The application will
make a temporary file in `/tmp/links.json` and maintain this for list additions and count
tracking. Doing it this way is not only _slow_ and _not scalable_, but the data in `/tmp` is
ephemeral and likely to be reset between builds, system reboots or deploys. It does work
fine for this exercise however.

## Caveats

1. Saving data isn't ideal (see above) and would benefit from using an actual data store.
2. There is no user distinction, so anyone with the site address can add to the list.
3. Dates are limited as `yyyy-mm-dd` making sorting potentially inconsistent.
4. I have excluded testing trivial components

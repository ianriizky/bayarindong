# Bayarindong Payment Gateway

A simple payment gateway service using [Next.js](https://nextjs.org) and [ElysiaJS](https://elysiajs.com) made for learning purpose.

## Requirement

- Node.js ^20.16.0
- pnpm ^9.7.1
- PostgreSQL ^16.3

## Installation

To get started using this app in your localhost, simply paste this command into your terminal:

```bash
git clone https://github.com/ianriizky/bayarindong.git && cd bayarindong
cp .env.example .env
```

Make sure to change `DB_URL` and `DB_URL_NON_POOLING` value on `.env` configuration file using your current database configuration. Then run this command below:

```bash
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
npm run dev:secure # run server using https
```

Open http://localhost:3000 with your browser to see the result.

## Changelog

You can read the changelog [here](CHANGELOG.md).

## License

You can read the license [here](LICENSE.md).

## Credits

- Septianata Rizky Pratama [@ianriizky](https://github.com/ianriizky).

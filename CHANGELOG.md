# Changelog

All notable changes to `Bayarindong Payment Gateway` will be documented in this file.

## [Unreleased](https://github.com/ianriizky/bayarindong/compare/1.0.0...develop)

## [1.0.0 (2024-08-22)](https://github.com/ianriizky/bayarindong/releases/tag/1.0.0)

- Initial commit by [@ianriizky](https://github.com/ianriizky) in [#7d370fd](https://github.com/ianriizky/bayarindong/commit/7d370fd97e67a34f0094d0a5052e8ca953a54f9c).
- feat: initiate rest api service using elysiajs, prisma orm, and postgresql by [@ianriizky](https://github.com/ianriizky) in [#94e2aaa](https://github.com/ianriizky/bayarindong/commit/94e2aaa45375403c2c9a156863c5d541700278c8).
- feat: initiate ui tools using mantine by [@ianriizky](https://github.com/ianriizky) in [#fb47a37](https://github.com/ianriizky/bayarindong/commit/fb47a37e74d3225708248ad180dc41f8c180ecf3).
- feat: finish auth function by [@ianriizky](https://github.com/ianriizky) in [#9514269](https://github.com/ianriizky/bayarindong/commit/951426916e1a50c3fda5a74790a47c6ff81eadb9).
- refactor: create folder to maintain types by [@ianriizky](https://github.com/ianriizky) in [#5027950](https://github.com/ianriizky/bayarindong/commit/50279503af55efcdc4dd40d45f5508d404e6b7dc).
- refactor: remove headers openapi doc on api and handle prisma error by [@ianriizky](https://github.com/ianriizky) in [#ab5e0d8](https://github.com/ianriizky/bayarindong/commit/ab5e0d8a457f432d3709a8e42ad8563eb3464fe0).
- build!: change package manager from npm to pnpm by [@ianriizky](https://github.com/ianriizky) in [#f84c081](https://github.com/ianriizky/bayarindong/commit/f84c0815afccd9c2ed0456262b02f8cd7e0dcabd).
- build: pnpm update @typescript-eslint/typescript-estree version to prevent warning when run next lint by [@ianriizky](https://github.com/ianriizky) in [#9957785](https://github.com/ianriizky/bayarindong/commit/9957785805ae121faee82353389061bbe843efc7).
- refactor: set model type using typebox by [@ianriizky](https://github.com/ianriizky) in [#1e5694f](https://github.com/ianriizky/bayarindong/commit/1e5694fd3db4d05eedfa6d23a246f5188c96a62f).
- refactor: set type assertion on error object in error handler by [@ianriizky](https://github.com/ianriizky) in [#92cc310](https://github.com/ianriizky/bayarindong/commit/92cc310395ab9176432dd356b14cdcc110e1d23d).
- refactor: update model extends function by [@ianriizky](https://github.com/ianriizky) in [#d866351](https://github.com/ianriizky/bayarindong/commit/d866351f1a1391072c887aebade20f6cec490298).
- refactor: redefine next auth data type by [@ianriizky](https://github.com/ianriizky) in [#d9153ee](https://github.com/ianriizky/bayarindong/commit/d9153eed09b5e1f16a6ffc69ff7a2edd33c38443).
- refactor: add InternalServerError and NotFoundError from elysia error on error class by [@ianriizky](https://github.com/ianriizky) in [#4ada7be](https://github.com/ianriizky/bayarindong/commit/4ada7be9c48e09461c425977065b267c6b906b5d).
- fix: warning webpack.cache.PackFileCacheStrategy serializing big strings when run dev and build by [@ianriizky](https://github.com/ianriizky) in [#2da8a41](https://github.com/ianriizky/bayarindong/commit/2da8a4171956867cd983a8356beba9425a64415a).
- build: add pnpm on package.json engine and install clsx library by [@ianriizky](https://github.com/ianriizky) in [#83a7b39](https://github.com/ianriizky/bayarindong/commit/83a7b39c99acebeba9b173952920d454bfc03eba).
- fix: role attribute undefined on middleware by [@ianriizky](https://github.com/ianriizky) in [#0634d04](https://github.com/ianriizky/bayarindong/commit/0634d04157c2f561cba0de80e35e2ec53713f402).
- feat: finish design implementation on homepage and dashboard by [@ianriizky](https://github.com/ianriizky) in [#94f4d6d](https://github.com/ianriizky/bayarindong/commit/94f4d6d26402397d2eafdf7a56451d87b9c2d1cf).
- feat: create color scheme toggle button on mobile view by [@ianriizky](https://github.com/ianriizky) in [#63ed813](https://github.com/ianriizky/bayarindong/commit/63ed813e07e84064e20a0be6cf58058bf967daa8).
- feat: create auto sign in after register by [@ianriizky](https://github.com/ianriizky) in [#cb2a719](https://github.com/ianriizky/bayarindong/commit/cb2a719f7183878c45d639646be78a36c512d589).
- docs: use pnpm to install and run project by [@ianriizky](https://github.com/ianriizky) in [#e24e334](https://github.com/ianriizky/bayarindong/commit/e24e334dcc9cb415aab98fab20d50c234984c232).
- build: use pnpm as default script runner on package.json by [@ianriizky](https://github.com/ianriizky) in [#b5f2583](https://github.com/ianriizky/bayarindong/commit/b5f2583f710510291c1bdcd02d6c84b84035e9a8).
- fix: use menu link as active dashboard menu by [@ianriizky](https://github.com/ianriizky) in [#e523ede](https://github.com/ianriizky/bayarindong/commit/e523ede575773b0a32f282a6779d469a591cf75e).
- chore: add DISABLE_TELEMETRY on env config by [@ianriizky](https://github.com/ianriizky) in [#e0d05a2](https://github.com/ianriizky/bayarindong/commit/e0d05a2a6451d0289685180f838e45aef7f6f1f2).
- feat: change dashboard profile page design by [@ianriizky](https://github.com/ianriizky) in [#fbe5779](https://github.com/ianriizky/bayarindong/commit/fbe5779797dc0b690dee3f54d51bb9866a448b19).
- feat: finish notification and transaction order page by [@ianriizky](https://github.com/ianriizky) in [#715087f](https://github.com/ianriizky/bayarindong/commit/715087f6285cbe1a160e9e0d14f665184337bc73).
- feat: finish deposit and withdraw page by [@ianriizky](https://github.com/ianriizky) in [#4f76c87](https://github.com/ianriizky/bayarindong/commit/4f76c871bec68113299df7d0f593079b3ce3921c).
- ci: create github action script to handle deploy on vercel by [@ianriizky](https://github.com/ianriizky) in [#3562728](https://github.com/ianriizky/bayarindong/commit/35627280fac331ba74aa4afbcae53fe17629ab76).
- build: downgrade pnpm version into 9 to adjust with vercel environment by [@ianriizky](https://github.com/ianriizky) in [#4ce8243](https://github.com/ianriizky/bayarindong/commit/4ce82438b632e84dcbbff49d9735d116725fb1f8).
- fix: process.env parse failed by [@ianriizky](https://github.com/ianriizky) in [#4595593](https://github.com/ianriizky/bayarindong/commit/459559342bb11200f66f5dfe66fa00ad95615b17).

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.5.0](https://github.com/dyegosoriano/api-boilerplate/compare/v1.4.0...v1.5.0) (2023-11-07)


### Features

* **src/infra/express:** adding security methods to the api ([2cd610c](https://github.com/dyegosoriano/api-boilerplate/commit/2cd610c18242234370c48903dc1c05525497a19c))

## [1.4.0](https://github.com/dyegosoriano/api-boilerplate/compare/v1.3.0...v1.4.0) (2023-08-09)


### Features

* **src/infra/queue,src/infra/redis:** creation of classes that deal with queues and caching ([2d4e88d](https://github.com/dyegosoriano/api-boilerplate/commit/2d4e88d753472b9869bd47e3f5bc981eb6936b18))


### Bug Fixes

* **src/infra/cluster.ts:** cluster mode fix ([4eb666b](https://github.com/dyegosoriano/api-boilerplate/commit/4eb666ba248cceda5b90b8230a9125e1edd5c3d5))

## [1.3.0](https://github.com/dyegosoriano/api-boilerplate/compare/v1.2.1...v1.3.0) (2023-07-25)


### Features

* **src/infra/cluster.ts:** implementing cluster mode ([18c05f3](https://github.com/dyegosoriano/api-boilerplate/commit/18c05f345fc9bed508a891ea92d437177cf9addc))

### [1.2.1](https://github.com/dyegosoriano/api-boilerplate/compare/v1.2.0...v1.2.1) (2023-07-04)

## 1.2.0 (2023-04-30)


### Features

* **add compareifafter in dataprovider:** add compareIfAfter in DataProvider ([d94fdbd](https://github.com/dyegosoriano/api-boilerplate/commit/d94fdbd2a4f13c50465d21d41b51e49f78bef62b))
* **add container with tsyringe:** add container with tsyringe ([4baa705](https://github.com/dyegosoriano/api-boilerplate/commit/4baa7054599bc50702c0435d4df2eb001e4c5641))
* **add date provider:** add date provider ([a9aa79d](https://github.com/dyegosoriano/api-boilerplate/commit/a9aa79decac722332440e4901487364e0d9e3024))
* **add docker:** add docker and docker-compose ([e183938](https://github.com/dyegosoriano/api-boilerplate/commit/e183938c671582f546bac61820e89f05aeb2b65d))
* add fastify ([cf1b313](https://github.com/dyegosoriano/api-boilerplate/commit/cf1b313fe95110236c26266cf9ac0f45a34dee73))
* add middleware ensureAuthenticate ([5780830](https://github.com/dyegosoriano/api-boilerplate/commit/5780830835c01dfe94d59e2ed3e28cb080b2a766))
* **add user listing route:** add user listing route ([b576af5](https://github.com/dyegosoriano/api-boilerplate/commit/b576af5e6d3ed429193ddee53b83ca15b518642f))
* adding gracefulShutdown ([6361dc3](https://github.com/dyegosoriano/api-boilerplate/commit/6361dc35e045f4f4154a2e860ca1e3a6c0881c3f))
* **adding ssl validation:** adding ssl validation ([1d48f86](https://github.com/dyegosoriano/api-boilerplate/commit/1d48f86cd1e43790918291d2f560b43375eb971c))
* **adding swc in the test:** adding swc in the test ([f783133](https://github.com/dyegosoriano/api-boilerplate/commit/f783133853882325154efbad636d803b4a7f2645))
* **adding user search method with filters:** adding user search method with filters ([6ea783c](https://github.com/dyegosoriano/api-boilerplate/commit/6ea783c304488efeff49b201ca0b8c217cbe8eed))
* **adding user view route:** adding user view route ([67ff95d](https://github.com/dyegosoriano/api-boilerplate/commit/67ff95d19491cc63b103e8476ab2ca44315d280b))
* applying permissions validation ([9f328fa](https://github.com/dyegosoriano/api-boilerplate/commit/9f328fa2740b488990ff2865b7ea877f02eb18b1))
* **appserver:** appServer ([3834204](https://github.com/dyegosoriano/api-boilerplate/commit/38342046af6e1a88ee137e379181341352f6e028))
* config build ([b88b26c](https://github.com/dyegosoriano/api-boilerplate/commit/b88b26c2191e68d7124f1ea8d4e0f50c96b2ce41))
* **config debug vscode:** config debug vscode ([ba46c17](https://github.com/dyegosoriano/api-boilerplate/commit/ba46c171ba2bb91031ac369cb5b36ea3ea656096))
* create AuthenticateUserController ([87715fb](https://github.com/dyegosoriano/api-boilerplate/commit/87715fb4b2d21bdbc6a587f3a8d961e3a1a54c3b))
* **create authenticateuserusecase:** create AuthenticateUserUseCase ([b8a4b8e](https://github.com/dyegosoriano/api-boilerplate/commit/b8a4b8ed678481ed16443853fa73f818878a11d1))
* **create createuserusecase:** create CreateUserUseCase ([2c0d48c](https://github.com/dyegosoriano/api-boilerplate/commit/2c0d48cada8d4d641295a6c68160202de562432f))
* **create models and repository users:** create models and repository users ([973bc89](https://github.com/dyegosoriano/api-boilerplate/commit/973bc89bb60ca7c25b0ac01750e43d8b44276136))
* **create refreshtokenusecase and refreshtokencontroller:** create RefreshToken ([d199b7f](https://github.com/dyegosoriano/api-boilerplate/commit/d199b7fc27ded22c25a8e47e94a60d968231edab))
* create seed script ([553d0c0](https://github.com/dyegosoriano/api-boilerplate/commit/553d0c0779f439f9a07f0fd3b4057780dde969fc))
* **create user migration:** create user migration ([d7f8754](https://github.com/dyegosoriano/api-boilerplate/commit/d7f87544da33f187d8ab0acd7e5cb5456fcd09e9))
* initializing structure ([71ae20e](https://github.com/dyegosoriano/api-boilerplate/commit/71ae20e9a28a1bad8218f569a4c0a5cbd5201296))
* **package.json:** adding versioning using standard-version ([c28fca5](https://github.com/dyegosoriano/api-boilerplate/commit/c28fca5b0e3b37934818af0c55b00291464bf834))
* **refreshtokensrepository:** refreshTokensRepository ([1ef3734](https://github.com/dyegosoriano/api-boilerplate/commit/1ef37348ac0867a4e6a52972eb026547d30a80ed))


### Bug Fixes

* **connection to database by docker:** connection to database by docker ([764623b](https://github.com/dyegosoriano/api-boilerplate/commit/764623b547001959ae7df12b4aa86f5573f87e6b))
* **on ts-node-dev restart:** on ts-node-dev restart ([68c0d85](https://github.com/dyegosoriano/api-boilerplate/commit/68c0d8592a00ddffff096498cf86aa4b9f4c8274))
* **test.yml:** test correction in the CI/CD process ([5b854a1](https://github.com/dyegosoriano/api-boilerplate/commit/5b854a1da377e9321241f6b71906592535ee1d40))

## 1.1.0 (2023-04-30)


### Features

* **add compareifafter in dataprovider:** add compareIfAfter in DataProvider ([d94fdbd](https://github.com/dyegosoriano/api-boilerplate/commit/d94fdbd2a4f13c50465d21d41b51e49f78bef62b))
* **add container with tsyringe:** add container with tsyringe ([4baa705](https://github.com/dyegosoriano/api-boilerplate/commit/4baa7054599bc50702c0435d4df2eb001e4c5641))
* **add date provider:** add date provider ([a9aa79d](https://github.com/dyegosoriano/api-boilerplate/commit/a9aa79decac722332440e4901487364e0d9e3024))
* **add docker:** add docker and docker-compose ([e183938](https://github.com/dyegosoriano/api-boilerplate/commit/e183938c671582f546bac61820e89f05aeb2b65d))
* add fastify ([cf1b313](https://github.com/dyegosoriano/api-boilerplate/commit/cf1b313fe95110236c26266cf9ac0f45a34dee73))
* add middleware ensureAuthenticate ([5780830](https://github.com/dyegosoriano/api-boilerplate/commit/5780830835c01dfe94d59e2ed3e28cb080b2a766))
* **add user listing route:** add user listing route ([b576af5](https://github.com/dyegosoriano/api-boilerplate/commit/b576af5e6d3ed429193ddee53b83ca15b518642f))
* adding gracefulShutdown ([6361dc3](https://github.com/dyegosoriano/api-boilerplate/commit/6361dc35e045f4f4154a2e860ca1e3a6c0881c3f))
* **adding ssl validation:** adding ssl validation ([1d48f86](https://github.com/dyegosoriano/api-boilerplate/commit/1d48f86cd1e43790918291d2f560b43375eb971c))
* **adding swc in the test:** adding swc in the test ([f783133](https://github.com/dyegosoriano/api-boilerplate/commit/f783133853882325154efbad636d803b4a7f2645))
* **adding user search method with filters:** adding user search method with filters ([6ea783c](https://github.com/dyegosoriano/api-boilerplate/commit/6ea783c304488efeff49b201ca0b8c217cbe8eed))
* **adding user view route:** adding user view route ([67ff95d](https://github.com/dyegosoriano/api-boilerplate/commit/67ff95d19491cc63b103e8476ab2ca44315d280b))
* applying permissions validation ([9f328fa](https://github.com/dyegosoriano/api-boilerplate/commit/9f328fa2740b488990ff2865b7ea877f02eb18b1))
* **appserver:** appServer ([3834204](https://github.com/dyegosoriano/api-boilerplate/commit/38342046af6e1a88ee137e379181341352f6e028))
* config build ([b88b26c](https://github.com/dyegosoriano/api-boilerplate/commit/b88b26c2191e68d7124f1ea8d4e0f50c96b2ce41))
* **config debug vscode:** config debug vscode ([ba46c17](https://github.com/dyegosoriano/api-boilerplate/commit/ba46c171ba2bb91031ac369cb5b36ea3ea656096))
* create AuthenticateUserController ([87715fb](https://github.com/dyegosoriano/api-boilerplate/commit/87715fb4b2d21bdbc6a587f3a8d961e3a1a54c3b))
* **create authenticateuserusecase:** create AuthenticateUserUseCase ([b8a4b8e](https://github.com/dyegosoriano/api-boilerplate/commit/b8a4b8ed678481ed16443853fa73f818878a11d1))
* **create createuserusecase:** create CreateUserUseCase ([2c0d48c](https://github.com/dyegosoriano/api-boilerplate/commit/2c0d48cada8d4d641295a6c68160202de562432f))
* **create models and repository users:** create models and repository users ([973bc89](https://github.com/dyegosoriano/api-boilerplate/commit/973bc89bb60ca7c25b0ac01750e43d8b44276136))
* **create refreshtokenusecase and refreshtokencontroller:** create RefreshToken ([d199b7f](https://github.com/dyegosoriano/api-boilerplate/commit/d199b7fc27ded22c25a8e47e94a60d968231edab))
* create seed script ([553d0c0](https://github.com/dyegosoriano/api-boilerplate/commit/553d0c0779f439f9a07f0fd3b4057780dde969fc))
* **create user migration:** create user migration ([d7f8754](https://github.com/dyegosoriano/api-boilerplate/commit/d7f87544da33f187d8ab0acd7e5cb5456fcd09e9))
* initializing structure ([71ae20e](https://github.com/dyegosoriano/api-boilerplate/commit/71ae20e9a28a1bad8218f569a4c0a5cbd5201296))
* **package.json:** adding versioning using standard-version ([c28fca5](https://github.com/dyegosoriano/api-boilerplate/commit/c28fca5b0e3b37934818af0c55b00291464bf834))
* **refreshtokensrepository:** refreshTokensRepository ([1ef3734](https://github.com/dyegosoriano/api-boilerplate/commit/1ef37348ac0867a4e6a52972eb026547d30a80ed))


### Bug Fixes

* **connection to database by docker:** connection to database by docker ([764623b](https://github.com/dyegosoriano/api-boilerplate/commit/764623b547001959ae7df12b4aa86f5573f87e6b))
* **on ts-node-dev restart:** on ts-node-dev restart ([68c0d85](https://github.com/dyegosoriano/api-boilerplate/commit/68c0d8592a00ddffff096498cf86aa4b9f4c8274))
* **test.yml:** test correction in the CI/CD process ([5b854a1](https://github.com/dyegosoriano/api-boilerplate/commit/5b854a1da377e9321241f6b71906592535ee1d40))

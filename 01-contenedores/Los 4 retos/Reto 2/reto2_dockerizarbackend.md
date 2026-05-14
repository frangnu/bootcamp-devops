PS C:\Users\frang\Documents\bootcamp-devops> cd C:\Users\frang\Documents\bootcamp-devops\backend
PS C:\Users\frang\Documents\bootcamp-devops\backend> docker build -t topics-api:1.0 .
[+] Building 14.3s (11/11) FINISHED                                                      docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                     0.0s
 => => transferring dockerfile: 286B                                                                     0.0s
 => WARN: FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 1)                           0.0s
 => WARN: FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 6)                           0.0s
 => [internal] load metadata for docker.io/library/node:20-alpine                                        0.3s
 => [internal] load .dockerignore                                                                        0.0s
 => => transferring context: 2B                                                                          0.0s
 => [internal] load build context                                                                        9.4s
 => => transferring context: 14.89MB                                                                     9.4s
 => [deps 1/4] FROM docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a0463  6.7s
 => => resolve docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0  0.0s
 => => sha256:4feea04c154301db6f4a496efa397b3db96603b1c009c797cfdde77bea8b3287 43.23MB / 43.23MB         4.9s
 => => sha256:fff4e2c1b189bf87d63ad8bd07f7f4eb288d6f2b6a07a8bb44c60e8c075d2096 445B / 445B               0.6s
 => => sha256:b2cbbfe903b0821005780971ddc5892edcc4ce74c5a48d82e1d2b382edac3122 1.26MB / 1.26MB           1.1s
 => => sha256:6a0ac1617861a677b045b7ff88545213ec31c0ff08763195a70a4a5adda577bb 3.86MB / 3.86MB           1.6s
 => => extracting sha256:6a0ac1617861a677b045b7ff88545213ec31c0ff08763195a70a4a5adda577bb                0.0s
 => => extracting sha256:4feea04c154301db6f4a496efa397b3db96603b1c009c797cfdde77bea8b3287                7.9s
 => => extracting sha256:b2cbbfe903b0821005780971ddc5892edcc4ce74c5a48d82e1d2b382edac3122                0.0s
 => => extracting sha256:fff4e2c1b189bf87d63ad8bd07f7f4eb288d6f2b6a07a8bb44c60e8c075d2096                0.0s
 => [deps 2/4] WORKDIR /app                                                                              0.3s
 => [deps 3/4] COPY package*.json ./                                                                     0.1s
 => [deps 4/4] RUN npm ci                                                                                2.3s
 => [runtime 3/4] COPY --from=deps /app/node_modules ./node_modules                                      0.0s
 => [runtime 4/4] COPY . .                                                                               0.5s
 => exporting to image                                                                                   1.5s
 => => exporting layers                                                                                  0.7s
 => => exporting manifest sha256:3b05052dae24df098b82f37869e77f3f035e477214293b8a24c04e3031e4e4ec        0.0s
 => => exporting config sha256:2ba834386ed9469ca498ebd64bf75f4925dc2db93a6417c340b9aeb393012d32          0.0s
 => => exporting attestation manifest sha256:dacf6a7ae29571b7fd8674342539eff6f9ee1aca05601f62b7625cbf47  0.0s
 => => exporting manifest list sha256:f433628febc98a0edc8dd91aef1ab745c1ee03dba9b0de74e112c8ad759c3d22   0.0s
 => => naming to docker.io/library/topics-api:1.0                                                        0.0s
 => => unpacking to docker.io/library/topics-api:1.0                                                     0.6s

 2 warnings found (use docker --debug to expand):
 - FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 6)
 - FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 1)
PS C:\Users\frang\Documents\bootcamp-devops\backend> docker run -d --name topics-api --network lemoncode-network -p 5000:5000 -e PORT=5000 -e MONGODB_URI="mongodb://lemoncode-mongo:27017/topics" topics-api:1.0
05b47de8b1542a63ac6ef297aaf91d67d33cbdff7e2ed6caf7f9cbcfb1712a73
PS C:\Users\frang\Documents\bootcamp-devops\backend> 


PS C:\Users\frang\Documents\bootcamp-devops\backend> docker logs topics-api --tail 100

> bootcamp-backend@1.0.0 start
> node index.js

Conectado a MongoDB: mongodb://lemoncode-mongo:27017/topics
Servidor escuchando en http://localhost:5000
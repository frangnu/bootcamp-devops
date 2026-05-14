FROM node:20-alpine as deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine as runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

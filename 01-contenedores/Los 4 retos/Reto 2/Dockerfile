FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

ENV MONGO_URI=mongodb://mongodb:27017/tu_base_datos
ENV PORT=5000

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 5000
CMD ["npm", "start"]

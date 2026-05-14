FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV API_BASE_URL=http://topics-api:5000/api/classes
EXPOSE 3000
CMD ["npm", "start"]

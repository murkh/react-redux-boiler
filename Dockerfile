# Stage 1: Build the React app
FROM node:18-alpine as base

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build


# Stage 2: Create the production image
FROM nginx:latest
COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
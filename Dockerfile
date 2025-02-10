FROM golang:1.23.5-alpine AS builder

WORKDIR /app
COPY backend/go.* ./
RUN go mod download
COPY backend/ .
RUN go build -o server

FROM nginx:alpine
COPY --from=builder /app/server /usr/bin/server
COPY dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 8080

CMD ["/bin/sh", "-c", "nohup /usr/bin/server & nginx -g 'daemon off;'"]
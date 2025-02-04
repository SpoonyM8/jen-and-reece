# Use a small Go base image
FROM golang:1.21-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the Go files and modules
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application
COPY . .

# Build the application
RUN go build -o main .

# Use a lightweight container for running the app
FROM alpine:latest
WORKDIR /root/

# Copy the compiled binary from the builder stage
COPY --from=builder /app/main .

# Expose the port the app runs on
EXPOSE 5000

# Run the binary
CMD ["./main"]

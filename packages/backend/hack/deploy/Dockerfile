FROM golang:alpine
RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN apk add git
RUN go mod download
RUN apk --no-cache add make git gcc libtool musl-dev ca-certificates dumb-init 
RUN go build main.go
CMD ["/app/main"]

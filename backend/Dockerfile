FROM ubuntu:22.04 AS builder
ENV DEBIAN_FRONTEND noninteractive

RUN apt update && apt install -y git curl cmake build-essential libtbb-dev unzip
RUN mkdir /app 
RUN mkdir /app/potreeconverter 
WORKDIR /app/potreeconverter 
RUN git clone https://github.com/potree/PotreeConverter.git . 
RUN mkdir build 
WORKDIR /app/potreeconverter/build 
RUN cmake .. 
RUN make 

# download and unzip PocketBase
ARG PB_VERSION=0.22.22
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

FROM ubuntu:22.04

RUN apt update

RUN apt install -y \
    ca-certificates \
    libtbb-dev

COPY --from=builder /app/potreeconverter/build /potreeconverter

COPY --from=builder /pb /pb

COPY ./pb_migrations /pb/pb_migrations

COPY ./pb_hooks /pb/pb_hooks

EXPOSE 8090

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]
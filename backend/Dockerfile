FROM rust:1-buster AS base

ENV USER=root

WORKDIR /code
RUN cargo init
COPY Cargo.toml /code/Cargo.toml
RUN cargo fetch

COPY src /code/src

CMD [ "cargo", "test", "--offline" ]

FROM base AS builder

RUN cargo build --release --offline

FROM rust:1-buster

COPY --from=builder /code/target/release/backend /usr/bin/backend

EXPOSE 8000

ENTRYPOINT [ "/usr/bin/backend" ]

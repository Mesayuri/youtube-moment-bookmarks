IMAGE_NAME=youtube-moment-bookmarks
IMAGE_PORT=5000

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run \
		--rm \
		--env-file .env \
		-p IMAGE_PORT:8000 \
		--name $(IMAGE_NAME) \
		$(IMAGE_NAME)

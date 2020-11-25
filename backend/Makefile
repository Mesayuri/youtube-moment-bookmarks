IMAGE_NAME=youtube-moment-bookmarks

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run \
		--rm \
		--env-file .env \
		-p 8000:8000 \
		--name $(IMAGE_NAME) \
		$(IMAGE_NAME)

# Build & Ship — Auto-generated for Static Site
FROM caddy:2-alpine
COPY . /srv
EXPOSE 80
CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":80"]

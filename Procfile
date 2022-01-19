web: git ls-files -z | GIT_PAGER= xargs -0 -L1 -I'{}' git log -n 1 --format="%h {}" -- '{}' > .index && npx vite --port $PORT --cached .index ./public

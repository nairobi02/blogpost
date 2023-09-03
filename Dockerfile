FROM node
WORKDIR /app
COPY package.json ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; \
    then npm install --only=production; \
    else npm install; \
    fi
COPY . ./
EXPOSE 3000
CMD ["node", "index.js"]
# expose 3000 only serves as a documentation purpose for the developer to know which port to expose when running the container from the image 
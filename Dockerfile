FROM node:16
EXPOSE 3000
WORKDIR /home/node/app
COPY project /home/node/app/
RUN npm install 
CMD npm start
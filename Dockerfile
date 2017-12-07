FROM ubuntu:latest

RUN apt -y update --fix-missing
RUN apt install -y nano git curl make python g++ nodejs npm --no-install-recommends

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN npm install bower -g

RUN mkdir /var/explorer
ADD .bowerrc bower.json package.json /var/explorer/

EXPOSE 8080

WORKDIR /var/explorer

ENTRYPOINT ["npm"]
CMD ["start"]
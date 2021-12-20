FROM redis:6.2.6-alpine

RUN apk add curl bash

ENV REDIS_HOSTNAME=redis
RUN mkdir /workgroup
COPY ./worker.sh /workgroup/worker.sh
COPY ./hold.sh /workgroup/hold.sh

CMD ["/workgroup/hold.sh"]
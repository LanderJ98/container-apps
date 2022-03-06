FROM centos/python-38-centos7

EXPOSE 5000

# RUN yum -y groupinstall "Development Tools"
# RUN yum -y install openssl-devel bzip2-devel libffi-devel xz-devel
# RUN yum -y install wget
# RUN wget https://www.python.org/ftp/python/3.8.12/Python-3.8.12.tgz
# RUN tar xvf Python-3.8.12.tgz
# RUN cd Python-3.8*/
# RUN ls -alF
# RUN ./configure --enable-optimizations
# RUN make altinstall

COPY ./requirements.txt /flaskapp/requirements.txt

WORKDIR /flaskapp
RUN pip3 install -r requirements.txt
COPY . /flaskapp
#RUN chmod u+x ./entrypoint.sh
CMD ["./entrypoint.sh"]


"""Database engine & session creation."""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import dotenv_values

config = dotenv_values(".env") 

connection = 'postgresql+psycopg2://{dbuser}:{dbpass}@{dbhost}/{dbname}'.format(
    dbuser=config['DBUSER'],
    dbpass=config['DBPASS'],
    dbhost=config['DBHOST'],
    dbname=config['DBNAME'])

engine = create_engine(
    connection,
    echo=True,
    pool_pre_ping=True
)
Session = sessionmaker(bind=engine)
session = Session()
import os

from flask import Flask, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from dotenv import dotenv_values
from flask_restx import Resource, Api
from flask_marshmallow import Marshmallow
from flask_cors import CORS

config = dotenv_values(".env") 

database_uri = 'postgresql+psycopg2://{dbuser}:{dbpass}@{dbhost}/{dbname}'.format(
    dbuser=config['DBUSER'],
    dbpass=config['DBPASS'],
    dbhost=config['DBHOST'],
    dbname=config['DBNAME']
)

app = Flask(__name__)
app.config.update(
    SQLALCHEMY_DATABASE_URI=database_uri,
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
)

# initialize the database connection
db = SQLAlchemy(app)

# initialize database migration management
migrate = Migrate(app, db)

api = Api(app)
ma = Marshmallow(app)
cors = CORS(app, origins=["http://localhost", "http://localhost:3000", "http://frontend"])

from database import session
from models import Person


class PersonSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "email", "height")
        model = Person

person_schema = PersonSchema()
people_schema = PersonSchema(many=True)

class PersonListResource(Resource):
    def get(self):
        people = Person.query.all()
        return people_schema.dump(people)
    
    def post(self):
        print("PERSON: ", request.get_json())
        new_person = Person(
            name=request.json['name'],
            email=request.json['email'],
            height=request.json['height']
        )
        session.add(new_person)
        session.commit()
        return person_schema.dump(new_person)

class PersonResource(Resource):
    def get(self, person_id):
        person = Person.query.get_or_404(person_id)
        return person_schema.dump(person)

    def patch(self, person_id):
        person = Person.query.get_or_404(person_id)

        if 'name' in request.json:
            person.name = request.json['name']
        if 'email' in request.json:
            person.email = request.json['email']
        if 'height' in request.json:
            person.height = request.json['height']

        db.session.commit()
        return person_schema.dump(person)

    def delete(self, person_id):
        person = Person.query.get_or_404(person_id)
        db.session.delete(person)
        db.session.commit()
        return '', 204

api.add_resource(PersonResource, '/api/people/<int:person_id>')
api.add_resource(PersonListResource, '/api/people')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
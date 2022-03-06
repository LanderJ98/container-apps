from app import db


class Person(db.Model):
    """Simple database model to track event attendees."""

    __tablename__ = 'guests'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    email = db.Column(db.String(120))
    height = db.Column(db.Integer)

    def __init__(self, name=None, email=None, height=None):
        self.name = name
        self.email = email
        self.height = height
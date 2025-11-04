from src import db
from sqlalchemy import Column, Integer, String, Boolean
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class Usuario(db.Model, UserMixin):
    __tablename__ = 'usuario'

    id = Column(Integer, primary_key=True, autoincrement=True )
    nome = Column(String(120), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    senha = Column(String(120), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)

    def set_password(self, password):
        self.senha = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.senha, password)

    
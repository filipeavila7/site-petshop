from src import db
from sqlalchemy import Column, String, Integer, Float

class Produto(db.Model):
    __tablename__ = "produto"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_produto = Column(String(120), nullable=False)
    valor = Column(Float, nullable=False)
    imagem = Column(String(255), nullable=False, default="default.png")
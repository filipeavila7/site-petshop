from src import db
from sqlalchemy import Column, String, Integer, Float
from sqlalchemy.orm import relationship

class Produto(db.Model):
    __tablename__ = "produto"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_produto = Column(String(120), nullable=False)
    valor = Column(Float, nullable=False)
    descricao = Column(String(255), nullable=False)
    imagem = Column(String(255), nullable=False, default="default.png")
    
    # Relação com Carrinho
    carrinho = relationship("Carrinho", back_populates="produto", cascade="all, delete-orphan" )
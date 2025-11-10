# models/post.py
from src import db
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship

class Post(db.Model):
    __tablename__ = "post"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_post = Column(String(120), nullable=False)
    imagem = Column(String(255), nullable=False, default="default.png")
    idade = Column(Integer, nullable=False)
    peso = Column(Float, nullable=False)
    raca = Column(String(255), nullable=True, default="Não determinada")

    # relação com Comentario
    comentarios = relationship(
        "Comentario",
        back_populates="post",
        cascade="all, delete-orphan"
    )


    curtidas = relationship(
        "Curtida",
        back_populates="post",
        cascade="all, delete-orphan"
    )
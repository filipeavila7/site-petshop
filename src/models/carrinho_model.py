
from src import db
from sqlalchemy import Integer, ForeignKey, Column, Boolean
from sqlalchemy.orm import relationship


class Carrinho(db.Model):
    __tablename__ = "carrinho"
    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuario.id"), nullable=False)
    produto_id = Column(Integer, ForeignKey("produto.id"), nullable=False)


    usuario = relationship("Usuario", backref="carrinho")
    produto = relationship("Produto", back_populates="carrinho")
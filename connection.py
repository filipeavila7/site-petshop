'''
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

# Carrega as variáveis do .env
load_dotenv()

# Monta a URI do banco dinamicamente
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# URI de conexão 
SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Cria a engine (ponte de conexão)
engine = create_engine(SQLALCHEMY_DATABASE_URI)

# Testa a conexão
try:
    connection = engine.connect()
    print("Banco conectado com sucesso!")
except Exception as e:
    print(f"Falha ao conectar: {e}")

'''

from sqlalchemy import create_engine

# Caminho (ou nome) do arquivo do banco de dados SQLite
# Ele será criado automaticamente se não existir
DB_NAME = 'petamigos1.db'

# URI de conexão para SQLite
SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_NAME}"
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Cria a engine (ponte de conexão)
engine = create_engine(SQLALCHEMY_DATABASE_URI)

# Testa a conexão
try:
    connection = engine.connect()
    print("Banco SQLite conectado com sucesso!")
except Exception as e:
    print(f"Falha ao conectar: {e}")





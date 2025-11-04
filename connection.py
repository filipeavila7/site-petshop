from sqlalchemy import create_engine

# Caminho (ou nome) do arquivo do banco de dados SQLite
# Ele será criado automaticamente se não existir
DB_NAME = 'petamigos.db'

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

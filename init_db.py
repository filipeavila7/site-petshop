"""
Script para inicializar/resetar o banco de dados e criar todas as tabelas
sem usar Flask-Migrate (migrations).

Uso:
  python init_db.py              # cria/atualiza tabelas mantendo dados
  python init_db.py --reset      # apaga e recria tudo do zero
"""

import sys
import os
from src import app, db
from src.models import usuario_models, post_models, comentario_models, curtida_models, produto_model, carrinho_model

def init_db(reset=False):
    """Inicializa o banco de dados"""
    with app.app_context():
        db_path = 'database.db'
        
        if reset:
            # Remove o banco se existir
            if os.path.exists(db_path):
                os.remove(db_path)
                print(f"🗑️  Banco de dados '{db_path}' removido.")
        
        # Cria todas as tabelas
        db.create_all()
        print("✅ Banco de dados criado/atualizado com sucesso!")
        print("📊 Tabelas criadas:")
        print("   - usuario")
        print("   - post")
        print("   - produto")
        print("   - carrinho")
        print("   - curtida")
        print("   - comentario")

if __name__ == '__main__':
    reset = '--reset' in sys.argv
    
    if reset:
        print("⚠️  AVISO: Isso vai APAGAR todo o banco de dados e recriá-lo do zero!")
        confirm = input("Tem certeza? Digite 'sim' para confirmar: ").strip().lower()
        if confirm != 'sim':
            print("❌ Operação cancelada.")
            sys.exit(0)
    
    init_db(reset=reset)

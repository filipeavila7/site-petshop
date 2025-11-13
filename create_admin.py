from src import db, app
from src.models.usuario_models import Usuario

with app.app_context():
    # Garante que as tabelas do banco existem antes de consultar/inserir
    # (útil para ambientes simples sem migrations configuradas)
    db.create_all()

    # Verifica se já existe um admin
    admin_existente = Usuario.query.filter_by(is_admin=True).first()
    if admin_existente:
        print("Já existe um usuário admin no banco.")
        print(f"Email: {admin_existente.email}")
        print(f"Senha: {admin_existente.senha}")
    else:
        # Cria um novo usuário admin
        admin = Usuario(
            nome="Admin",
            email="admin@admin.com",
            is_admin=True
        )
        admin.set_password("admin123")
        db.session.add(admin)
        db.session.commit()
        print("Usuário admin criado com sucesso!")
        print("Email: admin@admin.com")
        print("Senha: admin123")

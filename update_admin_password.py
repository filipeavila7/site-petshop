from src import db, app
from src.models.usuario_models import Usuario

with app.app_context():
    admin = Usuario.query.filter_by(email="admin@admin.com").first()
    if admin:
        admin.set_password("admin123")
        db.session.commit()
        print("Senha do admin atualizada com sucesso!")
        print("Email: admin@admin.com")
        print("Senha: admin123 (agora criptografada)")
    else:
        print("Admin não encontrado.")

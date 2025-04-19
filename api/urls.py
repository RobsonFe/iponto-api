from django.urls import URLPattern, path
from api.view.authentication_view import LoginView, LogoutView
from api.view.user_view import MasterUserCreateView


url_auth:list[URLPattern]=[
     path('login/', LoginView.as_view(), name='Login no sistema'),
     path('logout/', LogoutView.as_view(), name='Logout no sistema'),
]

urlpatterns = [
  path('user/create/master', MasterUserCreateView.as_view(), name='Criar Usuário Master'),
] + url_auth
from django.urls import URLPattern, path
from api.view.authentication_view import LoginView, LogoutView
from api.view.user_view import (
    MasterUserCreateView,
    MasterUserListView, 
    MasterUserUpdateView, 
    MasterUserDeleteView
    )
from api.view.company_view import (
    CompanyUserCreateView, CompanyUserListView, 
    CompanyUserDetailView, CompanyUserUpdateView, CompanyUserDeleteView
)
from api.view.employee_view import (
    EmployeeUserCreateView, EmployeeUserListView, 
    EmployeeUserDetailView, EmployeeUserUpdateView, EmployeeUserDeleteView
)

url_auth:list[URLPattern]=[
     path('login/', LoginView.as_view(), name='Login no sistema'),
     path('logout/', LogoutView.as_view(), name='Logout no sistema'),
]

url_master:list[URLPattern]=[
    path('user/create/master', MasterUserCreateView.as_view(), name='Criar Usuário Master'),
    path('user/list/master', MasterUserListView.as_view(), name='Listar Usuários Master'),
    path('user/update/master/<int:pk>', MasterUserUpdateView.as_view(), name='Atualizar Usuário Master'),
    path('user/delete/master/<int:pk>', MasterUserDeleteView.as_view(), name='Deletar Usuário Master'),
]

url_company:list[URLPattern]=[
    path('company/user/create/', CompanyUserCreateView.as_view(), name='Criar Usuário Company'),
    path('company/users/', CompanyUserListView.as_view(), name='Listar Usuários Company'),
    path('company/user/<int:pk>/', CompanyUserDetailView.as_view(), name='Detalhes Usuário Company'),
    path('company/user/update/<int:pk>', CompanyUserUpdateView.as_view(), name='Atualizar Usuário Company'),
    path('company/user/delete/<int:pk>', CompanyUserDeleteView.as_view(), name='Deletar Usuário Company'),
]

url_employee:list[URLPattern]=[
    path('employee/user/create/', EmployeeUserCreateView.as_view(), name='Criar Usuário Employee'),
    path('employee/users/', EmployeeUserListView.as_view(), name='Listar Usuários Employee'),
    path('employee/user/<int:pk>/', EmployeeUserDetailView.as_view(), name='Detalhes Usuário Employee'),
    path('employee/user/<int:pk>/update/', EmployeeUserUpdateView.as_view(), name='Atualizar Usuário Employee'),
    path('employee/user/<int:pk>/delete/', EmployeeUserDeleteView.as_view(), name='Deletar Usuário Employee'),
]

urlpatterns = url_auth + url_master + url_company + url_employee
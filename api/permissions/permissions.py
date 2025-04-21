from rest_framework import permissions

class IsMasterUser(permissions.BasePermission):
    """
    Permite acesso apenas a usuários master.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_master

class IsCompanyUser(permissions.BasePermission):
    """
    Permite acesso apenas a usuários company.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_company

class IsEmployeeUser(permissions.BasePermission):
    """
    Permite acesso apenas a usuários employee.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_employee

class IsCompanyOwnerOrMaster(permissions.BasePermission):
    """
    Permite que apenas o proprietário da empresa ou um master edite dados da empresa.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.is_master:
            return True
        
        if hasattr(obj, 'company_profile'):
            return obj.company_profile.user == request.user
        
        if hasattr(obj, 'user'):
            return obj.user == request.user
            
        return False

class IsCompanyEmployeeOwnerOrMaster(permissions.BasePermission):
    """
    Permite que apenas o proprietário da empresa, o próprio funcionário ou um master 
    edite dados de funcionário.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.is_master:
            return True
        
        # Se é o próprio funcionário
        if hasattr(obj, 'user') and obj.user == request.user:
            return True
            
        # Se é a empresa do funcionário
        if request.user.is_company and hasattr(request.user, 'company_profile'):
            return obj.company.id == request.user.company_profile.id
            
        return False
class IsCompanyUserOrMaster(permissions.BasePermission):
    """
    Permite acesso a usuários company OU master.
    """
    def has_permission(self, request, view):
        is_company = request.user and request.user.is_authenticated and request.user.is_company
        is_master = request.user and request.user.is_authenticated and request.user.is_master
        return is_company or is_master
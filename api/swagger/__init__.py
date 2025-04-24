from .authentication_mixin_swagger import (
    MyTokenObtainPairSwaggerMixin,
    LogoutSwaggerMixin,
)

from .user_mixin_swagger import (
    MasterUserCreateSwaggerMixin,
    MasterUserListSwaggerMixin,
    MasterUserUpdateSwaggerMixin,
    MasterUserDeleteSwaggerMixin,
)

from .company_mixin_swagger import (
    CompanyUserCreateSwaggerMixin,
    CompanyUserListSwaggerMixin,
    CompanyUserUpdateSwaggerMixin,
    CompanyUserDeleteSwaggerMixin,
)

from .employee_mixin_swagger import (
    EmployeeUserCreateSwaggerMixin,
    EmployeeUserListSwaggerMixin,
    EmployeeUserUpdateSwaggerMixin,
    EmployeeUserDeleteSwaggerMixin,
    EmployeeTransferSwaggerMixin,
)

__All__ = [
    "MyTokenObtainPairSwaggerMixin",
    "LogoutSwaggerMixin",
    "MasterUserCreateSwaggerMixin",
    "MasterUserListSwaggerMixin",
    "MasterUserUpdateSwaggerMixin",
    "MasterUserDeleteSwaggerMixin",
    "CompanyUserCreateSwaggerMixin",
    "CompanyUserListSwaggerMixin",
    "CompanyUserUpdateSwaggerMixin",
    "CompanyUserDeleteSwaggerMixin",
    "EmployeeUserCreateSwaggerMixin",
    "EmployeeUserListSwaggerMixin",
    "EmployeeUserUpdateSwaggerMixin",
    "EmployeeUserDeleteSwaggerMixin",
    "EmployeeTransferSwaggerMixin",
    
]

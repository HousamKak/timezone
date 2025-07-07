# app/services/exceptions.py
"""
Custom exceptions for service layer

These exceptions provide better error handling and can be caught
by FastAPI to return appropriate HTTP responses.
"""

class ServiceException(Exception):
    """Base exception for service layer"""
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class ValidationError(ServiceException):
    """Raised when data validation fails"""
    def __init__(self, message: str):
        super().__init__(message, status_code=400)

class NotFoundError(ServiceException):
    """Raised when a resource is not found"""
    def __init__(self, message: str):
        super().__init__(message, status_code=404)

class PermissionError(ServiceException):
    """Raised when user doesn't have permission"""
    def __init__(self, message: str):
        super().__init__(message, status_code=403)

class BusinessRuleError(ServiceException):
    """Raised when business rule is violated"""
    def __init__(self, message: str):
        super().__init__(message, status_code=400)

class ConflictError(ServiceException):
    """Raised when there's a data conflict"""
    def __init__(self, message: str):
        super().__init__(message, status_code=409)
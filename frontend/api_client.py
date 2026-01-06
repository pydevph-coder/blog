"""
API Client for mobile app frontend
Handles all API communication with the backend server
"""

import requests
import json
from typing import Optional, Dict, Any, List
from datetime import datetime


class APIError(Exception):
    """Custom exception for API errors"""
    pass


class APIClient:
    """Client for interacting with the blog API"""
    
    def __init__(self, base_url: str = "http://localhost:3000/api"):
        """
        Initialize API client
        
        Args:
            base_url: Base URL of the API server
        """
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    
    def _make_request(
        self, 
        method: str, 
        endpoint: str, 
        data: Optional[Dict] = None,
        params: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """
        Make HTTP request to API
        
        Args:
            method: HTTP method (GET, POST, etc.)
            endpoint: API endpoint path
            data: Request body data
            params: Query parameters
            
        Returns:
            Response data as dictionary
            
        Raises:
            APIError: If request fails
        """
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        try:
            response = self.session.request(
                method=method,
                url=url,
                json=data,
                params=params,
                timeout=10
            )
            
            # Try to parse JSON response
            print(response.text)
            try:
                result = response.json()
            except json.JSONDecodeError:
                result = {"error": "Invalid JSON response"}
            
            # Check for errors
            if not response.ok:
                error_msg = result.get('error', f'HTTP {response.status_code}')
                raise APIError(error_msg)
            
            return result
            
        except requests.exceptions.RequestException as e:
            raise APIError(f"Network error: {str(e)}")
    
    # User API methods
    def register_user(
        self, 
        device_id: str, 
        device_model: Optional[str] = None,
        android_version: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Register or update user (login)
        
        Args:
            device_id: Unique device identifier
            device_model: Device model name
            android_version: Android OS version
            
        Returns:
            User data dictionary
        """
        data = {
            "deviceId": device_id,
            "deviceModel": device_model,
            "androidVersion": android_version
        }
        return self._make_request("POST", "/users", data=data)
    
    def get_user(self, device_id: str) -> Dict[str, Any]:
        """
        Get user information by device ID
        
        Args:
            device_id: Device identifier
            
        Returns:
            User data dictionary with reports
        """
        return self._make_request("GET", "/users", params={"deviceId": device_id})
    
    # Report API methods
    def create_report(self, user_id: str, message: str) -> Dict[str, Any]:
        """
        Create a new report/bug report
        
        Args:
            user_id: User ID
            message: Report message
            
        Returns:
            Report data dictionary
        """
        data = {
            "userId": user_id,
            "message": message
        }
        return self._make_request("POST", "/reports", data=data)
    
    def get_user_reports(
        self, 
        user_id: str,
        solved: Optional[bool] = None,
        limit: int = 50,
        offset: int = 0
    ) -> Dict[str, Any]:
        """
        Get reports for a user
        
        Args:
            user_id: User ID
            solved: Filter by solved status (optional)
            limit: Maximum number of reports
            offset: Offset for pagination
            
        Returns:
            Dictionary with reports list and metadata
        """
        params = {
            "userId": user_id,
            "limit": limit,
            "offset": offset
        }
        if solved is not None:
            params["solved"] = str(solved).lower()
        
        return self._make_request("GET", "/reports", params=params)
    
    def get_report(self, report_id: str) -> Dict[str, Any]:
        """
        Get a single report by ID
        
        Args:
            report_id: Report ID
            
        Returns:
            Report data dictionary
        """
        return self._make_request("GET", f"/reports/{report_id}")
    
    # Version API methods
    def get_latest_version(self, app: str) -> Dict[str, Any]:
        """
        Get latest version information for an app
        
        Args:
            app: App identifier (e.g., "com.example.app")
            
        Returns:
            Version data dictionary
        """
        return self._make_request("GET", "/version", params={"app": app})
    
    def get_versions(
        self, 
        app: Optional[str] = None,
        limit: int = 50
    ) -> Dict[str, Any]:
        """
        Get list of versions
        
        Args:
            app: Filter by app identifier (optional)
            limit: Maximum number of versions
            
        Returns:
            Dictionary with versions list
        """
        params = {"limit": limit}
        if app:
            params["app"] = app
        
        return self._make_request("GET", "/version/list", params=params)


# Utility functions for device information
def get_device_id() -> str:
    """
    Get or generate device ID
    In a real app, use Android's Settings.Secure.ANDROID_ID
    For testing, generates a persistent ID
    """
    try:
        from kivy.storage.jsonstore import JsonStore
        store = JsonStore('device_data.json')
        if store.exists('device_id'):
            return store.get('device_id')['value']
        else:
            import uuid
            device_id = str(uuid.uuid4())
            store.put('device_id', value=device_id)
            return device_id
    except:
        # Fallback if storage not available
        import uuid
        return str(uuid.uuid4())


def get_device_info() -> Dict[str, Optional[str]]:
    """
    Get device information
    In a real Android app, use Build.MODEL, Build.VERSION.RELEASE, etc.
    """
    device_model = None
    android_version = None
    
    try:
        from jnius import autoclass
        Build = autoclass('android.os.Build')
        device_model = Build.MODEL
        android_version = Build.VERSION.RELEASE
    except:
        # Fallback for non-Android or testing
        device_model = "Unknown Device"
        android_version = "Unknown"
    
    return {
        "device_model": device_model,
        "android_version": android_version
    }


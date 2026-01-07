"""
User Registration/Login Screen for Kivy App
"""

from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.popup import Popup
from kivy.clock import Clock
import sys
import os

# Add parent directory to path to import api_client
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from api_client import APIClient, APIError, get_device_id, get_device_info


class UserScreen(BoxLayout):
    """Screen for user registration and login"""
    
    def __init__(self, api_base_url: str = "http://localhost:3000/api", **kwargs):
        super().__init__(orientation='vertical', padding=20, spacing=10, **kwargs)
        
        self.api_client = APIClient(api_base_url)
        self.user_data = None
        
        # Title
        title = Label(
            text='User Registration',
            size_hint_y=None,
            height=50,
            font_size=24,
            bold=True
        )
        self.add_widget(title)
        
        # Device ID display (read-only)
        device_id_label = Label(
            text='Device ID:',
            size_hint_y=None,
            height=30,
            halign='left'
        )
        self.add_widget(device_id_label)
        
        self.device_id_input = TextInput(
            text=get_device_id(),
            readonly=True,
            size_hint_y=None,
            height=40,
            background_color=(0.9, 0.9, 0.9, 1)
        )
        self.add_widget(self.device_id_input)
        
        # Device Model
        device_model_label = Label(
            text='Device Model:',
            size_hint_y=None,
            height=30,
            halign='left'
        )
        self.add_widget(device_model_label)
        
        device_info = get_device_info()
        self.device_model_input = TextInput(
            text=device_info.get('device_model', ''),
            multiline=False,
            size_hint_y=None,
            height=40
        )
        self.add_widget(self.device_model_input)
        
        # Android Version
        android_version_label = Label(
            text='Android Version:',
            size_hint_y=None,
            height=30,
            halign='left'
        )
        self.add_widget(android_version_label)
        
        self.android_version_input = TextInput(
            text=device_info.get('android_version', ''),
            multiline=False,
            size_hint_y=None,
            height=40
        )
        self.add_widget(self.android_version_input)
        
        # Status label
        self.status_label = Label(
            text='',
            size_hint_y=None,
            height=30,
            color=(1, 0, 0, 1)
        )
        self.add_widget(self.status_label)
        
        # Register/Login button
        self.register_btn = Button(
            text='Register / Login',
            size_hint_y=None,
            height=50,
            on_press=self.register_user
        )
        self.add_widget(self.register_btn)
        
        # User info display (hidden initially)
        self.user_info_label = Label(
            text='',
            size_hint_y=None,
            height=100,
            text_size=(None, None),
            halign='left',
            valign='top'
        )
        self.add_widget(self.user_info_label)
        self.user_info_label.opacity = 0
        
        # Spacer
        self.add_widget(Label(size_hint_y=1))
    
    def register_user(self, instance):
        """Register or login user"""
        device_id = self.device_id_input.text.strip()
        device_model = self.device_model_input.text.strip() or None
        android_version = self.android_version_input.text.strip() or None
        
        if not device_id:
            self.show_error("Device ID is required")
            return
        
        # Disable button during request
        self.register_btn.disabled = True
        self.register_btn.text = "Registering..."
        self.status_label.text = "Connecting to server..."
        
        # Make API call in a separate thread
        Clock.schedule_once(
            lambda dt: self._register_user_async(device_id, device_model, android_version),
            0.1
        )
    
    def _register_user_async(self, device_id: str, device_model="", android_version=""):
        """Async user registration"""
        try:
            response = self.api_client.register_user(device_id, device_model, android_version)
            print(response)
            if response.get('success'):
                self.user_data = response.get('user')
                self.status_label.text = "Registration successful!"
                self.status_label.color = (0, 1, 0, 1)
                self.show_user_info()
            else:
                self.show_error(response.get('error', 'Registration failed'))
                
        except APIError as e:
            self.show_error(str(e))
        except Exception as e:
            self.show_error(f"Unexpected error: {str(e)}")
        finally:
            self.register_btn.disabled = False
            self.register_btn.text = "Register / Login"
    
    def show_user_info(self):
        """Display user information"""
        if not self.user_data:
            return
        
        info_text = f"""User Information:
ID: {self.user_data.get('id', 'N/A')}
Device ID: {self.user_data.get('deviceId', 'N/A')}
Installed: {self.user_data.get('installedDate', 'N/A')}
Last Login: {self.user_data.get('lastLogin', 'N/A')}
Device Model: {self.user_data.get('deviceModel', 'N/A')}
Android Version: {self.user_data.get('androidVersion', 'N/A')}"""
        
        self.user_info_label.text = info_text
        self.user_info_label.opacity = 1
    
    def show_error(self, message: str):
        """Show error message"""
        self.status_label.text = f"Error: {message}"
        self.status_label.color = (1, 0, 0, 1)
    
    def get_user_id(self):
        """Get current user ID"""
        if self.user_data:
            return self.user_data.get('id')
        return None



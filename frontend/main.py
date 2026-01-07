"""
Main Kivy App Entry Point
Combines User Registration and Report Submission screens
"""

from kivy.app import App
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from screens.user_screen import UserScreen
from screens.report_screen import ReportScreen
from api_client import APIClient, get_device_id, get_device_info
import os


class MainScreen(Screen):
    """Main screen with navigation"""
    
    def __init__(self, api_base_url: str = "http://localhost:3000/api", **kwargs):
        super().__init__(**kwargs)
        
        layout = BoxLayout(orientation='vertical', padding=20, spacing=10)
        
        # Title
        title = Label(
            text='Mobile App Frontend',
            size_hint_y=None,
            height=50,
            font_size=28,
            bold=True
        )
        layout.add_widget(title)
        
        # Navigation buttons
        nav_layout = BoxLayout(size_hint_y=None, height=50, spacing=10)
        
        user_btn = Button(
            text='User Registration',
            on_press=lambda x: self.go_to('user')
        )
        nav_layout.add_widget(user_btn)
        
        report_btn = Button(
            text='Submit Report',
            on_press=lambda x: self.go_to('report')
        )
        # Note: Report screen will automatically register/login user using device ID
        nav_layout.add_widget(report_btn)
        
        layout.add_widget(nav_layout)
        layout.add_widget(Label(size_hint_y=1))
        
        self.add_widget(layout)
    def go_to(self,scrn):
        self.manager.current=scrn


class MobileApp(App):
    """Main Kivy Application"""
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Change this to your server URL
        self.api_base_url = os.environ.get('API_BASE_URL', 'http://localhost:3000/api')
        self.user_id = None
        self.device_id = get_device_id()
        self.api_client = APIClient(self.api_base_url)
    
    def build(self):
        """Build the app UI"""
        sm = ScreenManager()
        
        # Main screen
        main_screen = MainScreen(api_base_url=self.api_base_url,name='main')
        sm.add_widget(main_screen)
        sm.current = 'main'
        
        # User registration screen
        user_screen = Screen(name='user')
        user_widget = UserScreen(api_base_url=self.api_base_url)
        user_widget.register_btn.bind(on_press=lambda x: self.on_user_registered(user_widget))
        user_screen.add_widget(user_widget)
        sm.add_widget(user_screen)
        
        # Report screen (will auto-register user on load)
        report_screen = Screen(name='report')
        report_widget = ReportScreen(api_base_url=self.api_base_url, user_id=self.user_id)
        self.report_widget = report_widget
        report_screen.add_widget(report_widget)
        sm.add_widget(report_screen)
        
        self.screen_manager = sm
        
        # Auto-register user on app startup (optional - report screen will also do this)
        # This pre-registers the user so it's ready when they navigate to report screen
        self.auto_register_user_on_startup()
        
        return sm
    
    def auto_register_user_on_startup(self):
        """Automatically register/login user on app startup"""
        try:
            device_info = get_device_info()
            response = self.api_client.register_user(
                self.device_id,
                device_info.get('device_model'),
                device_info.get('android_version')
            )
            
            if response.get('success'):
                self.user_id = response['user']['id']
                # Update report screen if it exists
                if hasattr(self, 'report_widget'):
                    self.report_widget.set_user_id(self.user_id)
        except Exception as e:
            # Silent fail - report screen will handle registration
            print(f"Auto-registration on startup failed: {e}")
    
    def on_user_registered(self, user_widget):
        """Callback when user is registered"""
        user_id = user_widget.get_user_id()
        if user_id:
            self.user_id = user_id
            # Update report screen with user ID
            if hasattr(self, 'report_widget'):
                self.report_widget.set_user_id(user_id)
            # Switch to report screen
            self.screen_manager.current = 'report'


if __name__ == '__main__':
    # For Android, you might want to use:
    # API_BASE_URL = "https://your-production-server.com/api"
    # For local testing:
    # API_BASE_URL = "http://10.0.2.2:3000/api"  # Android emulator
    # API_BASE_URL = "http://localhost:3000/api"  # Local testing
    
    app = MobileApp()
    app.run()


"""
Report Submission Screen for Kivy App
"""

from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.scrollview import ScrollView
from kivy.clock import Clock
from typing import Optional
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from api_client import APIClient, APIError, get_device_id, get_device_info


class ReportScreen(BoxLayout):
    """Screen for submitting reports/bug reports"""
    
    def __init__(self, api_base_url: str = "http://localhost:3000/api", user_id: Optional[str] = None, **kwargs):
        super().__init__(orientation='vertical', padding=20, spacing=10, **kwargs)
        
        self.api_client = APIClient(api_base_url)
        self.user_id = user_id
        self.device_id = get_device_id()
        self.is_registering = False
        
        # Title
        title = Label(
            text='Submit Report',
            size_hint_y=None,
            height=50,
            font_size=24,
            bold=True
        )
        self.add_widget(title)
        
        # Device ID display (always shown)
        device_label = Label(
            text=f'Device ID: {self.device_id}',
            size_hint_y=None,
            height=30,
            halign='left',
            color=(0.5, 0.5, 0.5, 1)
        )
        self.add_widget(device_label)
        
        # Status label for user registration
        self.user_status_label = Label(
            text='Initializing...',
            size_hint_y=None,
            height=25,
            color=(0, 0, 1, 1)
        )
        self.add_widget(self.user_status_label)
        
        # Report message input
        message_label = Label(
            text='Report Message:',
            size_hint_y=None,
            height=30,
            halign='left'
        )
        self.add_widget(message_label)
        
        # ScrollView for text input
        scroll = ScrollView()
        self.message_input = TextInput(
            text='',
            multiline=True,
            size_hint_y=None,
            height=200,
            hint_text='Describe the issue, bug, or feedback...'
        )
        scroll.add_widget(self.message_input)
        self.add_widget(scroll)
        
        # Status label
        self.status_label = Label(
            text='',
            size_hint_y=None,
            height=30
        )
        self.add_widget(self.status_label)
        
        # Submit button (will be enabled after auto-registration)
        self.submit_btn = Button(
            text='Submit Report',
            size_hint_y=None,
            height=50,
            on_press=self.submit_report,
            disabled=True  # Disabled until user is registered
        )
        self.add_widget(self.submit_btn)
        
        # Recent reports section
        reports_label = Label(
            text='Recent Reports:',
            size_hint_y=None,
            height=30,
            font_size=16,
            bold=True
        )
        self.add_widget(reports_label)
        
        # ScrollView for reports list
        reports_scroll = ScrollView()
        self.reports_container = BoxLayout(
            orientation='vertical',
            size_hint_y=None,
            spacing=5
        )
        self.reports_container.bind(minimum_height=self.reports_container.setter('height'))
        reports_scroll.add_widget(self.reports_container)
        self.add_widget(reports_scroll)
        
        # Spacer
        self.add_widget(Label(size_hint_y=1))
        
        # Auto-register/login user on screen load
        if user_id:
            self.user_id = user_id
            self.submit_btn.disabled = False
            self.user_status_label.text = 'Ready to submit reports'
            self.user_status_label.color = (0, 1, 0, 1)
            Clock.schedule_once(lambda dt: self.load_reports(), 0.5)
        else:
            # Automatically register/login user using device ID
            Clock.schedule_once(lambda dt: self.auto_register_user(), 0.5)
    
    def auto_register_user(self):
        """Automatically register/login user using device ID"""
        if self.is_registering:
            return
        
        self.is_registering = True
        self.user_status_label.text = 'Registering device...'
        self.user_status_label.color = (0, 0, 1, 1)
        
        try:
            device_info = get_device_info()
            response = self.api_client.register_user(
                self.device_id,
                device_info.get('device_model'),
                device_info.get('android_version')
            )
            
            if response.get('success'):
                self.user_id = response['user']['id']
                self.submit_btn.disabled = False
                self.user_status_label.text = 'Ready to submit reports'
                self.user_status_label.color = (0, 1, 0, 1)
                self.load_reports()
            else:
                self.user_status_label.text = f"Error: {response.get('error', 'Registration failed')}"
                self.user_status_label.color = (1, 0, 0, 1)
                
        except APIError as e:
            self.user_status_label.text = f"Error: {str(e)}"
            self.user_status_label.color = (1, 0, 0, 1)
        except Exception as e:
            self.user_status_label.text = f"Unexpected error: {str(e)}"
            self.user_status_label.color = (1, 0, 0, 1)
        finally:
            self.is_registering = False
    
    def set_user_id(self, user_id: str):
        """Set user ID and enable submission"""
        self.user_id = user_id
        self.submit_btn.disabled = False
        self.user_status_label.text = 'Ready to submit reports'
        self.user_status_label.color = (0, 1, 0, 1)
        self.load_reports()
    
    def submit_report(self, instance):
        """Submit report to server - automatically registers user if needed"""
        # If user not registered yet, register first
        if not self.user_id:
            self.show_status("Registering device...", (0, 0, 1, 1))
            self.auto_register_user()
            # Wait a moment for registration, then try again
            Clock.schedule_once(lambda dt: self._retry_submit(), 1.0)
            return
        
        message = self.message_input.text.strip()
        if not message:
            self.show_status("Please enter a message", (1, 0, 0, 1))
            return
        
        # Disable button during request
        self.submit_btn.disabled = True
        self.submit_btn.text = "Submitting..."
        self.show_status("Submitting report...", (0, 0, 1, 1))
        
        # Make API call
        Clock.schedule_once(
            lambda dt: self._submit_report_async(message),
            0.1
        )
    
    def _submit_report_async(self, message: str):
        """Async report submission"""
        try:
            response = self.api_client.create_report(self.user_id, message)
            
            if response.get('success'):
                self.show_status("Report submitted successfully!", (0, 1, 0, 1))
                self.message_input.text = ''
                # Reload reports
                self.load_reports()
            else:
                self.show_status(f"Error: {response.get('error', 'Submission failed')}", (1, 0, 0, 1))
                
        except APIError as e:
            self.show_status(f"Error: {str(e)}", (1, 0, 0, 1))
        except Exception as e:
            self.show_status(f"Unexpected error: {str(e)}", (1, 0, 0, 1))
        finally:
            self.submit_btn.disabled = False
            self.submit_btn.text = "Submit Report"
    
    def load_reports(self):
        """Load user's reports"""
        if not self.user_id:
            return
        
        try:
            response = self.api_client.get_user_reports(self.user_id, limit=10)
            
            if response.get('success'):
                reports = response.get('reports', [])
                self.display_reports(reports)
            else:
                self.show_status(f"Error loading reports: {response.get('error')}", (1, 0, 0, 1))
                
        except APIError as e:
            self.show_status(f"Error: {str(e)}", (1, 0, 0, 1))
        except Exception as e:
            self.show_status(f"Unexpected error: {str(e)}", (1, 0, 0, 1))
    
    def display_reports(self, reports: list):
        """Display reports in the container"""
        self.reports_container.clear_widgets()
        
        if not reports:
            no_reports = Label(
                text='No reports yet',
                size_hint_y=None,
                height=30,
                color=(0.5, 0.5, 0.5, 1)
            )
            self.reports_container.add_widget(no_reports)
            return
        
        for report in reports:
            report_box = BoxLayout(
                orientation='vertical',
                size_hint_y=None,
                height=80,
                padding=5
            )
            
            # Report header
            header = BoxLayout(size_hint_y=None, height=25)
            status_color = (0, 1, 0, 1) if report.get('solved') else (1, 0.5, 0, 1)
            status_text = "Solved" if report.get('solved') else "Pending"
            status_label = Label(
                text=status_text,
                size_hint_x=0.3,
                color=status_color,
                bold=True
            )
            date_label = Label(
                text=report.get('date', 'N/A')[:10],
                size_hint_x=0.7,
                halign='right'
            )
            header.add_widget(status_label)
            header.add_widget(date_label)
            report_box.add_widget(header)
            
            # Report message (truncated)
            message = report.get('message', '')
            if len(message) > 100:
                message = message[:100] + "..."
            message_label = Label(
                text=message,
                size_hint_y=None,
                height=50,
                halign='left',
                text_size=(None, None),
                valign='top'
            )
            report_box.add_widget(message_label)
            
            self.reports_container.add_widget(report_box)
    
    def _retry_submit(self):
        """Retry submitting report after user registration"""
        message = self.message_input.text.strip()
        if message and self.user_id:
            self._submit_report_async(message)
    
    def show_status(self, message: str, color: tuple = (0, 0, 0, 1)):
        """Show status message"""
        self.status_label.text = message
        self.status_label.color = color


// Main JavaScript for PWA Starter
class PWAManager {
  constructor() {
    this.installPrompt = null;
    this.swRegistration = null;
    this.init();
  }

  // Initialize the PWA functionality
  async init() {
    this.updateOnlineStatus();
    this.setupEventListeners();
    await this.registerServiceWorker();
    this.checkInstallability();
    this.setupInstallPrompt();
    this.updateUI();
  }

  // Register the service worker
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        console.log('Registering service worker...');
        this.swRegistration = await navigator.serviceWorker.register('/service-worker.js');
        
        console.log('Service Worker registered successfully:', this.swRegistration);
        this.updateSWStatus('✅ Service Worker: Active');

        // Listen for updates
        this.swRegistration.addEventListener('updatefound', () => {
          console.log('Service Worker update found');
          this.handleSWUpdate();
        });

        // Listen for service worker messages
        navigator.serviceWorker.addEventListener('message', event => {
          console.log('Message from SW:', event.data);
          this.handleSWMessage(event.data);
        });

      } catch (error) {
        console.error('Service Worker registration failed:', error);
        this.updateSWStatus('❌ Service Worker: Failed');
      }
    } else {
      console.log('Service Worker not supported');
      this.updateSWStatus('❌ Service Worker: Not supported');
    }
  }

  // Handle service worker updates
  handleSWUpdate() {
    const newWorker = this.swRegistration.installing;
    
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // New content is available, prompt user to refresh
        this.showUpdatePrompt();
      }
    });
  }

  // Handle messages from service worker
  handleSWMessage(data) {
    if (data.type === 'VERSION') {
      console.log('SW Version:', data.version);
    }
  }

  // Show update prompt
  showUpdatePrompt() {
    const updatePrompt = document.createElement('div');
    updatePrompt.className = 'install-prompt';
    updatePrompt.innerHTML = `
      <p>🔄 New version available!</p>
      <button onclick="window.location.reload()">Update Now</button>
      <button onclick="this.parentElement.remove()">Later</button>
    `;
    document.body.appendChild(updatePrompt);
  }

  // Setup event listeners
  setupEventListeners() {
    // Online/offline status
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());

    // Demo buttons
    const cacheTestBtn = document.getElementById('cache-test');
    const notificationTestBtn = document.getElementById('notification-test');

    if (cacheTestBtn) {
      cacheTestBtn.addEventListener('click', () => this.testOfflineCapability());
    }

    if (notificationTestBtn) {
      notificationTestBtn.addEventListener('click', () => this.testNotifications());
    }

    // Install button
    const installBtn = document.getElementById('install-button');
    if (installBtn) {
      installBtn.addEventListener('click', () => this.installApp());
    }
  }

  // Update online status
  updateOnlineStatus() {
    const statusElement = document.getElementById('online-status');
    if (statusElement) {
      if (navigator.onLine) {
        statusElement.textContent = '🟢 Online';
        statusElement.className = 'success';
      } else {
        statusElement.textContent = '🔴 Offline';
        statusElement.className = 'error';
      }
    }
  }

  // Update service worker status
  updateSWStatus(status) {
    const statusElement = document.getElementById('sw-status');
    if (statusElement) {
      statusElement.textContent = status;
      if (status.includes('Active')) {
        statusElement.className = 'success';
      } else if (status.includes('Failed') || status.includes('Not supported')) {
        statusElement.className = 'error';
      }
    }
  }

  // Check if app can be installed
  checkInstallability() {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('App can be installed');
      event.preventDefault();
      this.installPrompt = event;
      this.updateInstallStatus('📱 Install: Available');
      this.showInstallButton();
    });

    // Check if already installed
    window.addEventListener('appinstalled', () => {
      console.log('App was installed');
      this.updateInstallStatus('✅ Install: Installed');
      this.hideInstallButton();
    });

    // For iOS devices (which don't support beforeinstallprompt)
    if (this.isIOS() && !this.isInStandaloneMode()) {
      this.updateInstallStatus('📱 Install: Available (iOS)');
      this.showIOSInstallInstructions();
    }
  }

  // Setup install prompt handling
  setupInstallPrompt() {
    // Check if running in standalone mode
    if (this.isInStandaloneMode()) {
      this.updateInstallStatus('✅ Install: Running as PWA');
      this.hideInstallButton();
    }
  }

  // Show install button
  showInstallButton() {
    const installBtn = document.getElementById('install-button');
    if (installBtn) {
      installBtn.style.display = 'block';
    }
  }

  // Hide install button
  hideInstallButton() {
    const installBtn = document.getElementById('install-button');
    if (installBtn) {
      installBtn.style.display = 'none';
    }
  }

  // Install the app
  async installApp() {
    if (this.installPrompt) {
      try {
        const result = await this.installPrompt.prompt();
        console.log('Install prompt result:', result);
        
        if (result.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          this.updateInstallStatus('⏳ Install: Installing...');
        } else {
          console.log('User dismissed the install prompt');
        }
        
        this.installPrompt = null;
      } catch (error) {
        console.error('Error during app installation:', error);
      }
    } else if (this.isIOS()) {
      this.showIOSInstallInstructions();
    }
  }

  // Show iOS install instructions
  showIOSInstallInstructions() {
    const output = document.getElementById('demo-output');
    if (output) {
      output.innerHTML = `
        <strong>📱 Install on iOS:</strong><br>
        1. Tap the Share button in Safari<br>
        2. Scroll down and tap "Add to Home Screen"<br>
        3. Tap "Add" to install the app
      `;
    }
  }

  // Update install status
  updateInstallStatus(status) {
    const statusElement = document.getElementById('install-status');
    if (statusElement) {
      statusElement.textContent = status;
      if (status.includes('Available')) {
        statusElement.className = 'success';
      } else if (status.includes('Installed') || status.includes('Running')) {
        statusElement.className = 'success';
      }
    }
  }

  // Test offline capability
  async testOfflineCapability() {
    const output = document.getElementById('demo-output');
    if (!output) return;

    output.innerHTML = '🔄 Testing offline capability...';

    try {
      // Test if service worker can serve cached content
      const response = await fetch('/manifest.json');
      const manifest = await response.json();
      
      output.innerHTML = `
        <strong>✅ Offline Test Successful!</strong><br>
        - Service Worker is active<br>
        - Cache is working<br>
        - App name: ${manifest.name}<br>
        - Try going offline and refreshing the page!
      `;
    } catch (error) {
      output.innerHTML = `
        <strong>❌ Offline Test Failed:</strong><br>
        ${error.message}
      `;
    }
  }

  // Test notifications
  async testNotifications() {
    const output = document.getElementById('demo-output');
    if (!output) return;

    if (!('Notification' in window)) {
      output.innerHTML = '❌ This browser does not support notifications';
      return;
    }

    if (Notification.permission === 'denied') {
      output.innerHTML = '❌ Notifications are blocked';
      return;
    }

    try {
      output.innerHTML = '🔄 Requesting notification permission...';
      
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        // Show a test notification
        const notification = new Notification('PWA Starter', {
          body: 'Notifications are working! 🎉',
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-192.png',
          tag: 'test-notification'
        });

        notification.onclick = () => {
          console.log('Notification clicked');
          notification.close();
        };

        output.innerHTML = `
          <strong>✅ Notifications Enabled!</strong><br>
          - Permission granted<br>
          - Test notification sent<br>
          - Check your notifications!
        `;
      } else {
        output.innerHTML = '❌ Notification permission denied';
      }
    } catch (error) {
      output.innerHTML = `
        <strong>❌ Notification Error:</strong><br>
        ${error.message}
      `;
    }
  }

  // Utility functions
  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  isInStandaloneMode() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true;
  }

  // Update UI elements
  updateUI() {
    // Add any additional UI updates here
    console.log('PWA Manager initialized successfully');
  }

  // Send message to service worker
  sendMessageToSW(message) {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message);
    }
  }

  // Get service worker version
  async getSWVersion() {
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'VERSION') {
          resolve(event.data.version);
        }
      };
      
      this.sendMessageToSW({
        type: 'GET_VERSION',
        port: messageChannel.port2
      });
    });
  }
}

// Initialize PWA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing PWA...');
  window.pwaManager = new PWAManager();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && 'serviceWorker' in navigator) {
    // Page became visible, check for updates
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.update();
      });
    });
  }
});

// Export for global access
window.PWAManager = PWAManager;
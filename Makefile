CHROME = chromium-browser
APP_NAME = hosted-plus
APP_LOCAL_DIR = $(APP_NAME)
APP_LOCAL_KEY = $(APP_NAME).pem
APP_LOCAL_CRX = $(APP_NAME).crx


all: coffeescript chrome-app

coffeescript: 
	coffee -c hosted-plus/*.coffee

chrome-app:
	@if [ -f $(APP_LOCAL_KEY) ]; then \
		echo "## Building app with existig key"; \
		$(CHROME) 	--pack-extension=$(APP_LOCAL_DIR) \
					--pack-extension-key=$(APP_LOCAL_KEY); \
	else \
		echo "## Building app and creating new key"; \
		$(CHROME) 	--pack-extension=$(APP_LOCAL_DIR); \
	fi

install: all
	$(CHROME) $(APP_LOCAL_CRX)

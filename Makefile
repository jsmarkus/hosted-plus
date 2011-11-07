CHROME = chromium-browser
APP_NAME := $(shell basename `pwd`)
SRC_DIR = src

APP_PEM = $(APP_NAME).pem
APP_CRX = $(APP_NAME).crx

TMP_PEM  = $(SRC_DIR).pem
TMP_CRX  = $(SRC_DIR).crx

all: coffeescript chrome-app

coffeescript: 
	coffee -c $(SRC_DIR)/*.coffee

chrome-app:
	@if [ -f $(APP_PEM) ]; then \
		echo "## Building app with existig key"; \
		$(CHROME) 	--pack-extension=$(SRC_DIR) \
					--pack-extension-key=$(APP_PEM); \
		mv $(TMP_CRX) $(APP_CRX); \
	else \
		echo "## Building app and creating new key"; \
		$(CHROME) 	--pack-extension=$(SRC_DIR); \
		mv $(TMP_CRX) $(APP_CRX); \
		mv $(TMP_PEM) $(APP_PEM); \
	fi; \

install:
	$(CHROME) $(APP_CRX)

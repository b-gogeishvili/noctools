import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By


def login(driver):
    try:
        # Google Main Page
        main_page_input = driver.find_element(By.ID, "identifierId")
        main_page_input.send_keys("#")
        main_page_input.send_keys(Keys.RETURN)

        # eToro Login Page
        while True:
            try:
                etoro_page_input = driver.find_element(By.ID, "i0116")
                etoro_page_input.send_keys("#")
                etoro_page_input.send_keys(Keys.RETURN)
                break
            except:
                pass

        # Google Verification Page
        past = False
        while not past:
            if driver.title == "Google Drive: Sign-in":
                past = True
                continue_button = driver.find_element(By.XPATH, "//button[contains(@class, 'VfPpkd-LgbsSe') and contains(@class, 'AjY5Oe')]")
                continue_button.click()
                time.sleep(10)

    except Exception as e:
        raise Exception("An error occurred during the login process.\n\n" + str(e))

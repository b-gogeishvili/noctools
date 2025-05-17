from login import login
from utils import *

from selenium import webdriver


driver = webdriver.Chrome()
driver.get("driveurl")

try:
    login(driver)
    move_file_to_cwd("#.csv")
except Exception as e:
    print(e)

driver.quit()

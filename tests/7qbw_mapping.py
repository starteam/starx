from TestStarX import StarGeneticsX
import unittest
import ipdb
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class EdX7QBWMapping(StarGeneticsX):
#    page_url = "{}{}".format(base_url,"StarCompiled/7QBW_EX5/index.html")
    base_url = StarGeneticsX.base_url
    page_url = "{}{}".format(base_url,"stargenetics_exercise_5_horizonal.html")

    # def test_homepage_sanity_check(self):
    #     driver = self.driver
    #     driver.get(self.base_url)
    #     self.assertIn('StarX Homepage', driver.title)

    def test_basic_load(self):
        driver = self.driver
        driver.get(self.page_url)
        driver.implicitly_wait(5)
        self.assertIn("7QBW_EX5", driver.title)
        self.assertIsNotNone(driver.find_element_by_class_name("starx_handled"))
        self.mate_strains('Fly 1','Fly 2', 100)
        self.assertEqual(self.experiment_count(),1)
        self.mate_strain_to_current_class('Fly 7','Exp. 1 1 M',100)
        WebDriverWait(driver,10).until(EC.alert_is_present())

if __name__ == '__main__':
    unittest.main()

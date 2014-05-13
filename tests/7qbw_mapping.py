import unittest
import ipdb
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

class EdX7QBWMapping(unittest.TestCase):
    base_url = 'http://127.0.0.1:8002/'
#    page_url = "{}{}".format(base_url,"StarCompiled/7QBW_EX5/index.html")
    page_url = "{}{}".format(base_url,"stargenetics_exercise_5_horizonal.html")

    def setUp(self):
        self.driver = webdriver.Chrome()

    def tearDown(self):
        self.driver.close()

    # def test_homepage_sanity_check(self):
    #     driver = self.driver
    #     driver.get(self.base_url)
    #     self.assertIn('StarX Homepage', driver.title)

    def test_basic_load(self):
        driver = self.driver
        driver.get(self.page_url)
        driver.implicitly_wait(10)
        self.assertIn("7QBW_EX5", driver.title)
        self.assertIsNotNone(driver.find_element_by_class_name("starx_handled"))
        # drag fly 1
        fly1 = driver.find_element_by_css_selector(".sg_strain_box[data-name='Fly 1']")
        fly1_id = fly1.get_attribute('data-id')
        ext_parent = driver.find_element_by_css_selector(".sg_experiment_parent")
        ActionChains(driver).drag_and_drop(fly1,ext_parent).perform()
        # drag fly 2
        ext_parent = driver.find_element_by_css_selector(".sg_experiment_parent[data-id]")
        self.assertEqual( fly1_id , ext_parent.get_attribute('data-id'))
        fly2 = driver.find_element_by_css_selector(".sg_strain_box[data-name='Fly 2']")
        fly2_id = fly2.get_attribute('data-id')
        ActionChains(driver).drag_and_drop(fly2,ext_parent).perform()
        # mate
        populated_parents = driver.find_elements_by_css_selector(".sg_experiment_parent[data-id]")
        self.assertEqual(len(populated_parents),2)
        mate_textbox = driver.find_element_by_css_selector(".sg_new_experiment_mate_count")
        mate_textbox.send_keys("100")
        mate_button = driver.find_element_by_css_selector(".sg_new_experiment_mate")
        mate_button.click()

        ipdb.set_trace()

if __name__ == '__main__':
    unittest.main()

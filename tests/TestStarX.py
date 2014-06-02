import unittest
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions

class StarGeneticsX(unittest.TestCase):
    base_url = 'http://127.0.0.1:8002/'

    def setUp(self):
        d = DesiredCapabilities.CHROME
        d['loggingPrefs'] = { 'browser':'ALL' }
        self.driver = webdriver.Chrome(desired_capabilities=d)

    def tearDown(self):
        self.driver.close()

    def print_log(self):
        for entry in self.driver.get_log('browser'):
            print(entry)

    def wait_for_new_mating(self):
        WebDriverWait(self.driver, 10).until(expected_conditions.presence_of_element_located((By.CSS_SELECTOR, '.sg_experiment_parent[data-empty="true"]')))

    def experiment_count(self):
        history = self.driver.find_element_by_css_selector('.sg_experiment_holder[data-kind="history"]')
        experiment_count = len(history.find_elements_by_css_selector('.sg_experiment_box'))
        return experiment_count

    def strain_fly(self,fly_name):
        return self.driver.find_element_by_css_selector(".sg_strain_box[data-name='{}']".format(fly_name))

    def mating_site(self):
        return self.driver.find_element_by_css_selector(".sg_experiment_parent")

    def drag_strain_to_ext_parent(self,strain_fly):
        fly1 = self.strain_fly(strain_fly)
        fly1_id = fly1.get_attribute('data-id')
        ext_parent = self.mating_site()
        ActionChains(self.driver).drag_and_drop(fly1,ext_parent).perform()
        # drag fly 2
        ext_parent = self.driver.find_elements_by_css_selector(".sg_experiment_parent[data-id]")
        ok = False
        for p in ext_parent:
            ok = ok or (fly1_id == p.get_attribute('data-id'))
        self.assertTrue(ok)

    def current_class_fly(self,class_name):
        return self.driver.find_element_by_css_selector(".sg_strain_box[data-test-id='{}']".format(class_name))

    def drag_class_to_mating_site(self,class_name):
        fly = self.current_class_fly(class_name)
        fly_id = fly.get_attribute('data-id')
        ext_parent = self.mating_site()
        ActionChains(self.driver).drag_and_drop(fly,ext_parent).perform()
        ext_parent = self.driver.find_elements_by_css_selector(".sg_experiment_parent[data-id]")
        ok = False
        for p in ext_parent:
            ok = ok or (fly_id == p.get_attribute('data-id'))
        self.assertTrue(ok)

    def mate(self,count):
        driver = self.driver
        populated_parents = driver.find_elements_by_css_selector(".sg_experiment_parent[data-id]")
        self.assertEqual(len(populated_parents),2)
        mate_textbox = driver.find_element_by_css_selector(".sg_new_experiment_mate_count")
        mate_textbox.clear();
        mate_textbox.send_keys("100")
        mate_button = driver.find_element_by_css_selector(".sg_new_experiment_mate")
        mate_button.click()
        self.wait_for_new_mating()

    def mate_strains(self,strain1,strain2,count):
        driver =self.driver
        self.drag_strain_to_ext_parent(strain1)
        self.drag_strain_to_ext_parent(strain2)
        self.mate(count)

    def mate_strain_to_current_class(self,strain1,class_selector,count):
        driver =self.driver
        self.drag_strain_to_ext_parent(strain1)
        self.drag_class_to_mating_site(class_selector)
        self.mate(count)





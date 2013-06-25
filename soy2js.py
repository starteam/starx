#!/usr/bin/env python

import sys
import subprocess
import re
import os


def run(input_file,cp_dir):
    intermediate_file = input_file + ".bare.js"
    output_file = input_file + ".js"
    ret = subprocess.call(
        ["java", "-jar", "{0}/tools/SoyToJsSrcCompiler.jar".format(cp_dir), "--shouldProvideRequireSoyNamespaces",
         "--shouldDeclareTopLevelNamespaces", "--shouldGenerateJsdoc", "--outputPathFormat",
         intermediate_file, input_file])
    inp = open(intermediate_file, 'r')
    inp_lines = inp.readlines()
    inp.close()
    os.unlink(intermediate_file)
    out_lines = []
    package = None
    for line in inp_lines:
        match = re.match(r'goog.provide\(\'([^\']*)\'\)', line)
        if match:
            package = match.group(1)
            line = "define(['require','exports','lib/soyutils'],function(require,exports,soy){{\n var {0}= {0} ? {0} : {{}};".format(package)
            need_close = True
        if re.match(r'goog.require', line):
            line = ''
        out_lines.append(line)
    if package is not None:
        match = re.match(r'^([^\.]+)', package)
        if match:
            package = match.group(1)
        out_lines.append('for(var i in {0}) {{ exports[i] = {0}[i] }};\n'.format(package))
        out_lines.append("});\n")
    out = open(output_file, 'w')
    out.writelines(out_lines)
    out.close()


if __name__ == '__main__':
    run(sys.argv[1], os.path.dirname(sys.argv[0]))

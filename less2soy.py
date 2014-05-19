#!/usr/bin/env python3

import sys
import subprocess
import os

prefix = ['{namespace less_css}\n','/**\n','css file\n', '*/\n','{template .css_text}\n']
suffix = ['{/template}']

def run(input_file,cp_dir):
    css_file = input_file.replace( ".less", ".css")
    soy_file = input_file.replace( ".less", ".css.soy")
    if( css_file == input_file):
        exit(1);
    process = subprocess.Popen(["/usr/bin/env", "lessc","--no-color", input_file],stdout=subprocess.PIPE)
    stdout = process.stdout
    lines = []
    for line in stdout:
        lines.append( line.decode('utf-8'))
    css = open( css_file, 'w')
    css.writelines(lines)
    css.close()
    esc_lines = []
    for line in lines:
        l = line.replace('{','^lb^').replace('}','^rb^').replace('^lb^','{lb}').replace('^rb^','{rb}')
        esc_lines.append(l)
    out = open( soy_file ,'w')
    out.writelines(prefix)
    out.writelines(esc_lines)
    out.writelines(suffix)
    out.close();

if __name__ == '__main__':
    run(sys.argv[1], os.path.dirname(sys.argv[0]))

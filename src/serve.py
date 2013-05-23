#!/usr/bin/env python

import SimpleHTTPServer
import SocketServer
import os
import re


class MyHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        f = None
        if os.path.isdir(path):
            if not self.path.endswith('/'):
                # redirect browser - doing basically what apache does
                self.send_response(301)
                self.send_header("Location", self.path + "/")
                self.end_headers()
                return None
            for index in "index.html", "index.htm":
                index = os.path.join(path, index)
                if os.path.exists(index):
                    path = index
                    break
            else:
                return self.list_directory(path)
        for key in self.mapping:
            path = re.sub(key, self.mapping[key], path)
        ctype = self.guess_type(path)
        try:
            # Always read in binary mode. Opening files in text mode may cause
            # newline translations, making the actual size of the content
            # transmitted *less* than the content-length!
            f = open(path, 'rb')
        except IOError:
            self.send_error(404, "File not found")
            print "File not found: {0}".format(path)
            return None
        self.send_response(200)
        self.send_header("Content-type", ctype)
        self.send_header("Cache-Control", "no-cache no-store")
        fs = os.fstat(f.fileno())
        self.send_header("Content-Length", str(fs[6]))
        self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
        self.end_headers()
        return f


if __name__ == '__main__':
    mapping = {}
    f = open("mapping.txt")
    for line in f:
        (key, val) = line.split()
        mapping[key] = val
    f.close()
    del f
    PORT = 8002
    h = MyHandler
    h.mapping = mapping
    httpd = SocketServer.TCPServer(("", PORT), h)
    print "serving at port", PORT
    httpd.serve_forever()


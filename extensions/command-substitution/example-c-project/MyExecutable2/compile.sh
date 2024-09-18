#!/bin/sh
g++ -g -fpic -I.. source1.cpp -lMyLibrary1 -L../MyLibrary1 -o MyExecutable2

#!/bin/bash

cd router

my_array=(addressdelivery car cardirectory client reservation)
for item in "${my_array[@]}"
do
	touch "$item.router.js"
done
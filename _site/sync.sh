#!/bin/sh

prefix=s3://www.bos-schweiz.ch

# create a temp file to hold html
tmp=$(mktemp --suffix=.html)

# retrieve html from primary hosting into temp file
wget -kO $tmp https://b2bw.github.io/releases/

# upload temp file to secondary hosting via s3
aws s3 cp --acl public-read $tmp \
    $prefix/de/orang-utan-auswilderung.htm

# remove temp file
rm $tmp

# send an email to local user root
echo "http://www.bos-schweiz.ch/de/orang-utan-auswilderung.htm" \
    | mail -s "LP Releases has been updated." root

#!/bin/sh

prefix=s3://www.bos-schweiz.ch

# create a temp file to hold html
tmp=$(mktemp --suffix=.html)

# MAPPING
# =======
# http://born2bewild.org            -> http://bos-schweiz.ch
# -----------------------------------------------------------------------------
# /releases                         -> /f/auswilderungen/index.htm
# /releases/ost-kalimantan.html     -> /f/auswilderungen/ost-kalimantan.htm
# /releases/salat-island.html       -> /f/auswilderungen/salat-island.htm
# /releases/technische-details.html -> /f/auswilderungen/technische-details.htm

base='http://born2bewild.org/releases'
target='/f/auswilderungen'

# retrieve html from primary hosting into temp file
wget -kO $tmp $base/

# convert specific links
sed -i "s|$base/ost-kalimantan.html|$target/ost-kalimantan.htm|" $tmp
sed -i "s|$base/salat-island.html|$target/salat-island.htm|" $tmp
sed -i "s|$base/technische-details.html|$target/technische-details.htm|" $tmp

# upload temp file to secondary hosting via s3
aws s3 cp --acl public-read $tmp $prefix$target/index.htm

# ost-kalimantan
wget -kO $tmp $base/ost-kalimantan.html
sed -i "s|$base/salat-island.html|$target/salat-island.htm|" $tmp
sed -i "s|$base/technische-details.html|$target/technische-details.htm|" $tmp
sed -i "s|$base/#ost-kalimantan|$target.htm#ost-kalimantan|" $tmp
aws s3 cp --acl public-read $tmp $prefix$target/ost-kalimantan.htm

# salat-island
wget -kO $tmp $base/salat-island.html
sed -i "s|$base/ost-kalimantan.html|$target/ost-kalimantan.htm|" $tmp
sed -i "s|$base/technische-details.html|$target/technische-details.htm|" $tmp
sed -i "s|$base/#salat-island|$target.htm#salat-island|" $tmp
aws s3 cp --acl public-read $tmp $prefix$target/salat-island.htm

# technische-details
wget -kO $tmp $base/technische-details.html
sed -i "s|$base/ost-kalimantan.html|$target/ost-kalimantan.htm|" $tmp
sed -i "s|$base/salat-island.html|$target/salat-island.htm|" $tmp
sed -i "s|$base/#technische-details|$target.htm#technische-details|" $tmp
aws s3 cp --acl public-read $tmp $prefix$target/technische-details.htm


# remove temp file
rm $tmp

# send an email to local user root
echo "http://www.bos-schweiz.ch/f/auswilderungen/" \
    | mail -s "LP Releases has been updated." root

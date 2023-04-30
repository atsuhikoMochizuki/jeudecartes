#! /usr/bin/bash

echo Entrez un commentaire pour le commit:
read commentaire
git add .
git commit -m "$commentaire"
git push

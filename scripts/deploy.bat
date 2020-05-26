# build
quasar build

# navigate into the build output directory
cd dist/spa

git init
git add -A
git commit -m 'Build  %DATE:~6,4%-%DATE:~3,2%-%DATE:~0,2% %TIME:~0,2%:%TIME:~3,2%' 

git push -f git@github.com:AaronHernandezPerez/covid-tracker-front-dist.git master
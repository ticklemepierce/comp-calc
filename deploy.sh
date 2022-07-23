rm -rf .parcel-cache

yarn build

git subtree split --prefix dist -b gh-pages # create a local gh-pages branch containing the splitted output folder
git checkout gh-pages
git add .
git commit -m "Deploy"
git push
git checkout main
git branch -D gh-pages # delete the local gh-pages because you will need it: ref

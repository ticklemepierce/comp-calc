yarn build

git subtree split --prefix dist -b gh-pages
git checkout gh-pages
git add .
git commit -m "Deploy"
git push -f
git checkout main
git branch -D gh-pages
npm run sass-bund
webpack -p --progress
cd public
aws s3 sync . s3://www.joncannon.codes
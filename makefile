sync-db:
	rm song_metadata_trie.json file_data.json
	# compile server code 
	make server-compile 
	# generate data from current database
	node generate_file_data.js
	cp song_metadata_trie.json public/tunes
	cp file_data.json public/tunes
	# upload data to object store 
	aws s3 sync ./public/tunes s3://sickamptunes

serv: 
	nodemon dev-server.js & tsc -p ./server -w

client:
	NODE_ENV=mute webpack -w --progress

client-compile:
	NODE_ENV=production webpack -p --progress

server-compile:
	tsc -p ./server 

dc-bld: 
	make client-compile
	make server-compile
	docker build . -t iamjoncannon/sickamp

dc-rbld:
	make dc-bld
	make dc-run 

dc-run:
	docker run -p 3000:3000 iamjoncannon/sickamp 
	docker exec -it iamjoncannon/sickamp

dc-push:
	docker push iamjoncannon/sickamp

dc-deploy:
	echo deploying
	./deploy/docker_deploy.sh 

dep:
	make dc-bld
	make dc-push 
	make dc-deploy 

install-lazy:
	npm install webpack@4.28.4
	npm install acorn-dynamic-import@4.0.0
	npm update acorn --depth 20 && npm dedupe

# some git commands to help deal with me accidentally
# committing mp3s

nuke-git:
	git reflog expire --expire=now --all
	git gc --aggressive --prune=now
	git repack -a -d -l

git-filter-attempt:
	git filter-branch --index-filter 'git rm --cached -r --ignore-unmatch ./public/tunes' HEAD

git-filter-attempt-two:
	git filter-branch -f --prune-empty --index-filter 'git rm --cached -r -f --ignore-unmatch ./public/modules' HEAD

# AWS EC2 Deployment Steps

implements the deployment process outlined in the following medium article:

https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-1-d67367ac5171

condenses a bunch of the steps into bash scripts (in particular install.js takes care of 4-5 parts of the installation process for the remote server)

this process assumes the following:

1. AWS account with correct IAM permissions for EC2
2. the AWS CLI configured locally  
3. EC2 SSH key for the EC2 instance called "esee.pem" saved to ./.ssh folder 

these are the package.json scripts:

```json
"sh": "cd ~/.ssh & ssh -i $key ubuntu@$addy",
"dep-install": "chmod +x ./deploy/install & ./deploy/install ubuntu@$addy",
"dep-nginx": "chmod +x ./deploy/nginxConfig & ./deploy/nginxConfig",
"deploy": "addy=$addy key=$key pm2 deploy ecosystem.config.js production",
"site":"open http://$addy",
```

This is the AWS CLI script to launch an EC2- careful - don't wanna blow the free tier :p

```bash
aws ec2 run-instances --launch-template LaunchTemplateId=lt-04dfc64765fa9b907,Version=1 
```

template data is listed at the bottom.

you can get the public IP after it launch by calling:

```bash
aws ec2 describe-instances
```


# Its a Process


### Part Zero- make sure you have...

1. An EC2 instance running and configured to your local AWS CLI - the LaunchTemplate is the free tier.

2. A github repo initalized with SSH 



### Part One- on the local machine

1. place the public address from the EC2 console and the location of your ssh key into your .bashrc as follows:

```bash
export addy='ec2-54-69-228-6.us-west-2.compute.amazonaws.com'
export key='~/.ssh/esee.pem'
```

this stores the variables persistently in bash 

probably not an issue to be pushing these exactly remotely, but better this way


2. "npm run dep-install" - shells into the remote server and runs all the installation scripts via pseudo-terminal (putting nginx, node, postgres, pm2 on the remote instance)

// permissions issue chmod not running in script - put in separate script
// tweaked install file

### Part Two- on the remote machine

1. connect - "npm run sh" to shell into EC2 to configure on the remote server.

2. configure git- 

  a. make SSH key:

    ssh-keygen -t rsa  

    use default name, NO PASS PHRASE. pm2 can't enter the passphrase when it shells in server side, so it must be blank for Part Three to work
    
    less ~/.ssh/id_rsa.pub - copy...

  b. ... paste in github repo under settings/deploy keys

  c. have the remote server load the SSH key automatically:

    nano ~/.bashrc

    paste in at the top:

    eval `ssh-agent -s`

    ssh-add

3. git clone the repo to the server

4. complete nginx config from repo- "npm run dep-nginx" 

    run "sudo nginx -t" to check that everything is configged correctly

    run "sudo nginx -T" to check that the engine server was added

    run "sudo service nginx restart" for good measure

5. run sudo npm i  

6. test if the project runs as cloned, if not, manually change it on the local server, then push the changes until it works. changing on the remote server won't help- your changes will be lost later when you relay your local commits over to the server 


### Part Three- back on the local machine- complete CI/CD with pm2

1. make sure pm2 is installed globally and locally with "--save-dev"

2. complete the ecosystem.config file.

This is going to pull varibles from bash, so this will fail if you haven't done the .bashrc process described above

This is the last one that worked:

```js

module.exports = {
  apps: [{
    name: 'Rawww',
    script: './main.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: process.env.addy,
      key: process.env.key,
      ref: 'origin/master',
      repo: 'git@github.com:iamjoncannon/Raw.git',
      path: '/home/ubuntu/Raw',
      'post-deploy': 'sudo npm install && sudo pm2 startOrRestart ecosystem.config.js'
    }
  }
}

```

3. run locally:

```bash
key=$key addy=$addy pm2 deploy ecosystem.config.js production setup
```

this should clear with the errors described below

4. commit locally and push the ecosystem file to the repo  

5. run locally:

```bash
pm2 deploy ecosystem.config.js production
```

or 

```bash
npm run deploy
```

notes:

1. always push the bundled version of the app to the server- never use webpack on the server itself, this will create git issues. you can just literally run "webpack" one last time before git adding to make sure

2. you got these two weird errors server side:

    warning: unable to access '/home/ubuntu/.config/git/ignore': Permission denied

    warning: unable to access '/home/ubuntu/.config/git/attributes': Permission denied

    but it didn't affect the app

    can access if you run sudo su to switch to super user

    but files don't actually exist... weird


#### Part Four- Set up Postgres


using this https://github.com/snowplow/snowplow/wiki/Setting-up-PostgreSQL

basic process- install postgres, reconfigure so it will communicate with the internet, create users, upload the data from a table, allow users to access the data


1. make sure Security Group includes setting for 5432- something like security group, inbound. (Setting is "anywhere".) This allows the client to hit the postgres server through its port

2. edit the config (should figure out how to do this automatically in the future)


a. pg_hba.conf file


find hba_file:

```sql
SHOW hba_file;
```

its actually here:

/etc/postgresql/10/main/pg_hba.conf

```bash
sudo nano /etc/postgresql/10/main/pg_hba.conf
```

this
```
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     ident
# IPv4 local connections:
host    all             all             127.0.0.1/32            ident
# IPv6 local connections:
host    all             all             ::1/128                 ident
```

to this 

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             power_user      0.0.0.0/0               md5
host    all             other_user      0.0.0.0/0               md5
host    all             storageLoader   0.0.0.0/0               md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
```

add this too (this was a two hour bug)

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    all             all             127.0.0.1/32            trust
```

I just muted the existing code and copied and pasted the above

b. postgresql.config file

find config_file:

```sql
SHOW config_file;
```

```bash
sudo nano /etc/postgresql/10/main/postgresql.conf
```

Uncomment line 59 and change to all addresses:

```
#listen_addresses = 'localhost'    
```

to 
```
listen_addresses='*'
```


And uncomment line 63: 

```
port = 5432
```

restart postgres:

```
sudo /etc/init.d/postgresql restart
```

3. configure user credentials

log into postgres:

```
sudo su - postgres
$ psql
```

create users

whats up with these passwords?

they assume theyre are set in the bash environment

root admin:
```sql
CREATE USER power_user SUPERUSER;
ALTER USER power_user WITH PASSWORD '$poweruserpassword';
```

other user:
```sql
CREATE USER other_user NOSUPERUSER;
ALTER USER other_user WITH PASSWORD '$otheruserpassword';
```

create a test database:
```sql
CREATE DATABASE Test WITH OWNER other_user;
```


now you can log back into postgres with the power user:

```bash
psql -U power_user test
```

grant clientside user accounts:

```sql
CREATE USER storageloader PASSWORD '$storageloaderpassword';

GRANT USAGE ON SCHEMA atomic TO storageloader;
GRANT INSERT ON TABLE   "atomic"."events" TO storageloader;
```

### psql/sql etc

#### shell into database remotely:

```bash
PGPASSWORD=$poweruserpassword psql -h <HOSTNAME> -U power_user -d Test -p <PORT> 
```

my solution:

```bash
PGPASSWORD=yadayada psql -h $addy -U power_user -d test -p 5432
```
have to paste in "$poweruserpassword" which is blank now... in the future look into changing the password 

#### change password:

access via "sudo su - postgres && psql"

```sql
ALTER USER power_user WITH PASSWORD 'yadayada';
```


#### upload sql databases 

create .sql file 

pg_dump --format=p dbname=graphing_Hegel -f graphing_Hegel.sql 


one strategy - enter locally and try uploading the file

psql graphing_Hegel < graphing_Hegel.sql

databasename must be created before importing.

psql on ubuntu is set with default role "ubuntu" as user

lets try this:

going to set environment variable $psqlpw to the actual password

```sql
CREATE USER ubuntu SUPERUSER;
ALTER USER ubuntu WITH PASSWORD '$psqlpw';
```

trying to upload the database with a user defined that doesn't exist
remotely:

ERROR:  role "jonathancannon" does not exist

```sql
CREATE USER jonathancannon SUPERUSER;
ALTER USER jonathancannon WITH PASSWORD '$psqlpw';
```

with this user defined, nav to project directory and run:

psql graphing_Hegel < graphing_Hegel.sql

and it uploads no probs :)



#### postgres URL

the client is not connecting to the database directly, the express server is calling the postgres server on the same machine via loopback localhost

there will probably be a different solution if the database is on a separate machine
aka microservicing.

this monolithic- http server and databse server are talking directly to each other

format of postgres url is:

"postgres://YourUserName:YourPassword@YourHost:5432/YourDatabase"

so solution would be:

postgres://jonathancannon:$psqlpw@$localhost:5432/graphing_Hegel

there were a bunch of errors revolving around the permissions inside the 
postgres config file /etc/postgresql/10/main/pg_hba.conf

connect ECONNREFUSED 127.0.0.1:5432
no pg_hba.conf entry for host "172.31.30.198", user "jonathancannon", database "graphing_Hegel", SSL on

the solution that worked was to add the following line giving full loopback 
permissions

you actually added a couple of bash alias because you were going into the file
so much and restarting psql

alias pgconfig='sudo nano /etc/postgresql/10/main/pg_hba.conf'
alias restartpg='sudo /etc/init.d/postgresql restart'

add this to the pg_hba file:

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    all             all             127.0.0.1/32            trust
```


# AWS config on local machine 

AWS guide to installing Python CLI client

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

Create user in AWS console and a group- give that group:

"arn:aws:iam::aws:policy/AWSElasticBeanstalkFullAccess"

your current user has full elastic beanstalk permissions, and you haven't had any issues with EC2/IAM yet 

you also added this policy:

```json

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "iam:CreateServiceLinkedRole",
            "Resource": "arn:aws:iam::*:role/aws-service-role/*"
        }
    ]
}

```

the user should give you an access key and secret access key.  Copy and paste these then run:

```bash
aws configure --profile eb-deploy-user
```

your local machine should be able to access AWS remotely without any issues :) 

this was the article you used:

https://medium.com/@xoor/deploying-a-node-js-app-to-aws-elastic-beanstalk-681fa88bac53

# how to set up HTTPS


see SSL project for notes

https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca

aws ec2 describe-instances --instance-ids i-043f0af76893a3a41



sudo setcap 'cap_net_bind_service=+ep' /usr/bin/node

sudo setcap 'cap_net_bind_service=+ep' `which node`

https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca

https://gist.github.com/firstdoit/6389682

launch the server at the provided URL in non-secure mode, link
to that DNS, then shell back

sudo certbot certonly --dry-run --webroot -w ./server -d ssltest.joncannon.codes



# S3/CloudFront notes

https://blog.cloudboost.io/react-with-circleci-aws-s3-and-aws-cloudfront-844a1b2c75c9

index.html must be in root file

add to permissions policy:

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::myawesomeapp.com/*"
        }
    ]
}

aws s3 sync JayCeeCodes/ s3://joncannon.codes --exclude node_modules/*

https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html


... don't need to do this

CloudFront

Origin Domain Name field, you’ll get a dropdown list. Choose the name of your S3 bucket. 

 change the Viewer Protocol Policy to Redirect HTTP to HTTPS. 

 set the Default Root Object to index.html as that’s the entry page to our app.

cloudfront automatically 

# Notes on React.lazy

you figured out the problem and put it in a script

npm run install-lazy

```
npm i react@16.8.6
```


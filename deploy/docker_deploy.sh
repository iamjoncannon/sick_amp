echo deploying
cd ~/.ssh
ssh -T -i $key ubuntu@$sick_amp_addy << 'ENDSSH'
    sudo docker kill docker kill $(sudo docker ps -q)
    sudo docker pull iamjoncannon/sickamp
    sudo docker run -p 3000:3000 iamjoncannon/sickamp &
    exit
ENDSSH

# sudo docker exec -it iamjoncannon/sickampde
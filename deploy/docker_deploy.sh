echo deploying
cd ~/.ssh
ssh -T -i $key ubuntu@$sick_amp_addy << 'ENDSSH'
    sudo docker run -p 3000:3000 iamjoncannon/sickamp 
    sudo docker exec -it iamjoncannon/sickamp
    exit
ENDSSH
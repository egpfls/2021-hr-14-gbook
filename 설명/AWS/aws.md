# Aws EC2 Server 설치
## Aws 콘솔에서 작업
	1. 탄력적 IP 할당
	2. 할당받은 IP와 Instance 연결
	3. 보안그룹에서 80, 3306포트를 모든 곳에서 접근으로 설정

## 서버 접근
```bash
# 서버 접근
ssh -i xxxx.pem ubuntu@15.164.53.151

# 접속해서
sudo apt upgrade
sudo apt install npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash


source ~/.bashrc
npm i npm
mkdir webroot
cd webroot

sudo apt-get mariadb-server
```
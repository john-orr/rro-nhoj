read -p "Database username:" DBUSER
read -s -p "Database password:" DBPASS
echo
DBUSER=$DBUSER DBPASS=$DBPASS node index.js
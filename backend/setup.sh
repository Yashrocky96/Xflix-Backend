# Setup file to upload data to MongoDB 
mongo qkart --eval "db.dropDatabase()" 
mongoimport -d xflix -c videos --file data/export_videos.json
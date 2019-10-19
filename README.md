[Canine Assistance](https://www.canineassistants.org/)
# Setup
install dependencies
```
pip install -r requirements.txt
```
Mongodb HOST_URI are in auth.py
# Run the backend
to run backend:
```
python3 api.py
```
open another terminal and enter the sample query prompt
```
curl http://localhost:5000/add -d "user=Crystal Gong" -d "disease=blood pressure" -d "type=high" -d "condition=bad" -d "result=911"  -X POST -v
```
see that the query get posted on mongodb

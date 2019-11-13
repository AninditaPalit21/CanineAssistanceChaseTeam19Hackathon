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

##### The code ("Code") in this repository was created solely by the student teams during a coding competition hosted by JPMorgan Chase Bank, N.A. ("JPMC").						JPMC did not create or contribute to the development of the Code.  This Code is provided AS IS and JPMC makes no warranty of any kind, express or implied, as to the Code,						including but not limited to, merchantability, satisfactory quality, non-infringement, title or fitness for a particular purpose or use.
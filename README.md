Backend setup 

Open backend folder
1:Install dependencies:
npm install

2:Set up environment variables:
Create a .env file in the root directory of your project.

Create variables and insert the values
PORT = (port number)
JWT_SECRET_KEY = (jwt random secret code )
TOKEN_KEY = (insert a random token value)
MONGO_URI=(insert the mongodb url)

3:Insert products into database by using endpoint
GET /addProducts


APP setup
Open ShopeApp 
1:Install dependencies:
npm install

2:Create a .env file in the root directory of your project.
Create variables and insert the values
API_URL=(url of the server)


3:Make an android build
npm run android

4:Start the development server
npm start

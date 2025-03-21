const returnClarifaiRequestOptions = (imageurl) => {
  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = process.env.API_KEY_CLARIFAI;
  // Can be found in Account section
  const USER_ID = '719146pi4r1w'; 
  // Can be found in App description    
  const APP_ID = 'face-detection'; 
  // const MODEL_ID = 'face-detection'; 
  const IMAGE_URL = imageurl; 

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions;
}

const handleClarifaiApiCall = (req, res) => {
	fetch("https://api.clarifai.com/v2/models/face-detection/outputs", 
      returnClarifaiRequestOptions(req.body.input))
	.then(response => response.json())
	.then(data => res.json(data))
	.catch(err => res.status(400).json('Unable to work with api'))
}

const updateEntries = (db) => (req, res) => {
	const { id } = req.body;
	db('users')
	.where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => res.json(entries[0].entries))
	.catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = { updateEntries, handleClarifaiApiCall };